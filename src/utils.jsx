import { render } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";

export const getMode = (breakpoint = 900) =>
  document.body.clientWidth >= breakpoint ? "desktop" : "mobile";

export const useMode = (breakpoint = 900) => {
  const [mode, setMode] = useState(getMode(breakpoint));
  useEffect(() => {
    window.addEventListener("resize", () => setMode(getMode(breakpoint)));
  }, []);
  return mode;
};

export const renderShadow = (content, target) => {
  const shadow = target.attachShadow({ mode: "open" });
  render(content, shadow);
};

export const getScrollTop = () =>
  window.pageYOffset !== undefined
    ? window.pageYOffset
    : (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;

const jsonCache = {};
export const useJSON = (
  uris,
  { cache = true, corsProxy = false, defaultValue = null } = {
    cache: true,
    corsProxy: false,
    defaultValue: null,
  }
) => {
  const [value, setValue] = useState(defaultValue);
  let single = false;
  if (!Array.isArray(uris)) {
    uris = uris ? [uris] : [];
    single = true;
  }
  useEffect(() => {
    if (uris.length) {
      const cacheKey = uris.join(" ");
      if (cache && jsonCache[cacheKey]) {
        setValue(jsonCache[cacheKey]);
        return;
      }
      (async () => {
        const responses = await Promise.all(
          uris.map((uri) =>
            fetch(
              corsProxy
                ? `https://corsproxy.io/?${encodeURIComponent(uri)}`
                : uri
            )
          )
        );
        const json = await Promise.all(
          responses.map((response) => {
            if (response.status < 200 || response.status > 299) {
              return { error: { status: response.status } };
            } else {
              try {
                return response.json();
              } catch (error) {
                return { error: { message: error } };
              }
            }
          })
        );
        const result = single ? json[0] : json;
        setValue(result);
        if (cache) jsonCache[cacheKey] = result;
      })();
    }
  }, [...uris]);
  return value;
};

export const useResourceGroups = () => {
  const response = useJSON(
    "https://operations-api.access-ci.org/wh2/cider/v1/access-active-groups/type/resource-catalog.access-ci.org/"
  );
  return useTransform([response], ({ results }) => {
    const { active_groups, feature_categories, features, organizations } =
      results;

    const tagCategories = [
      {
        tagCategoryId: -1,
        name: "Resource Provider",
        tags: [],
      },
    ];
    const tagCategoryIds = [-1];
    for (let category of feature_categories)
      if ([100, 102, 103].includes(category.feature_category_id)) {
        tagCategories.push({
          tagCategoryId: category.feature_category_id,
          name: category.feature_category_name,
          tags: [],
        });
        tagCategoryIds.push(category.feature_category_id);
      }

    tagCategories.sort((a, b) => a.name.localeCompare(b.name));

    const tags = features
      .filter((feature) => tagCategoryIds.includes(feature.feature_category_id))
      .map((feature) => ({
        tagId: feature.feature_id,
        name: feature.feature_name,
        tagCategoryId: feature.feature_category_id,
      }));

    for (let organization of organizations)
      tags.push({
        tagId: organization.organization_id * -1,
        name: organization.organization_name,
        tagCategoryId: -1,
        iconUri: organization.organization_favicon_url || null,
      });

    tags.sort((a, b) => a.name.localeCompare(b.name));

    const tagIds = tags.map((tag) => tag.tagId);

    const resourceCategories = [
      {
        resourceCategoryId: 1,
        name: "Compute & Storage Resources",
        resourceGroups: [],
        resourceGroupIds: [],
      },
      {
        resourceCategoryId: 2,
        name: "Program & Other Resources",
        resourceGroups: [],
        resourceGroupIds: [],
      },
    ];

    const resourceGroups = active_groups
      .filter((group) => group.rollup_info_resourceids)
      .map((group) => ({
        infoGroupId: group.info_groupid,
        name: group.group_descriptive_name,
        description: group.group_description,
        infoResourceIds: group.rollup_info_resourceids,
        imageUri: group.group_logo_url
          ? `https://cider.access-ci.org/public/groups/${
              group.group_logo_url.match(/[0-9]+/)[0]
            }/logo`
          : null,
        tagIds: [
          ...group.rollup_organization_ids
            .map((orgId) => orgId * -1)
            .filter((tagId) => tagIds.includes(tagId)),
          ...group.rollup_feature_ids.filter((featureId) =>
            tagIds.includes(featureId)
          ),
        ],
        resourceCategoryId: group.rollup_feature_ids.includes(137) ? 2 : 1,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return linkResourceGroups({
      resourceCategories,
      resourceGroups,
      tags,
      tagCategories,
    });
  });
};

export const useResourceGroup = (infoGroupId, defaultValue = null) => {
  // TODO: Replace this with the individual group endpoint once it is available.
  const groups = useResourceGroups();
  return groups
    ? groups.resourceGroups.find((group) => group.infoGroupId == infoGroupId) ||
        defaultValue
    : defaultValue;
};

export const useResourceGroupResources = (infoGroupId, defaultValue = []) => {
  const res = useJSON(
    `https://operations-api.access-ci.org/wh2/cider/v1/access-active/info_groupid/${infoGroupId}/?format=json`
  );
  return res && !res.error ? res.results : defaultValue;
};

export const useTransform = (
  responseArray,
  transformFunction,
  defaultValue = null
) => {
  return useMemo(() => {
    if (!responseArray.length) return defaultValue;
    for (let response of responseArray)
      if (!response || response.error) return defaultValue;
    return transformFunction.apply(null, responseArray);
  }, responseArray);
};

const makeMap = (items, key) => {
  const map = {};
  for (let item of items) map[item[key]] = item;
  return map;
};

const linkResourceGroups = ({
  resourceCategories,
  resourceGroups,
  tags,
  tagCategories,
}) => {
  const tagCategoryMap = {};
  for (let tagCategory of tagCategories) {
    tagCategory.tags = [];
    tagCategoryMap[tagCategory.tagCategoryId] = tagCategory;
  }

  const tagMap = {};
  for (let tag of tags) {
    tag.tagCategory = tagCategoryMap[tag.tagCategoryId];
    tag.tagCategory.tags.push(tag);
    tag.resources = [];
    tagMap[tag.tagId] = tag;
  }

  const resourceCategoryMap = {};
  for (let resourceCategory of resourceCategories) {
    resourceCategory.resourceGroups = [];
    resourceCategoryMap[resourceCategory.resourceCategoryId] = resourceCategory;
  }

  for (let resourceGroup of resourceGroups) {
    resourceGroup.resourceCategory =
      resourceCategoryMap[resourceGroup.resourceCategoryId];
    resourceGroup.resourceCategory.resourceGroups.push(resourceGroup);
    resourceGroup.tags = resourceGroup.tagIds.map((tagId) => tagMap[tagId]);
  }

  return { resourceCategories, resourceGroups, tags, tagCategories };
};

export const filterResourceGroups = (
  { resourceGroups, tags, tagCategories },
  activeTagIds
) => {
  const resourceCategoryIds = new Set();
  const infoGroupIds = new Set();
  const tagCategoryIds = new Set();
  const tagIds = new Set(activeTagIds);

  for (let tag of tags)
    if (tagIds.has(tag.tagId)) tagCategoryIds.add(tag.tagCategoryId);

  const activeTagCategories = tagCategories.filter(({ tagCategoryId }) =>
    tagCategoryIds.has(tagCategoryId)
  );

  // TODO: Improve logic for disabled tags. Tags should be disabled if the active
  // tags in all *other* tag categories eliminate all resource groups containing
  // that tag. The current logic fails to disable some tags when another tag in
  // the same tag category is active.
  const disabledTagIds = new Set(
    tags
      .filter((tag) => !tagCategoryIds.has(tag.tagCategoryId))
      .map((tag) => tag.tagId)
  );

  for (let resourceGroup of resourceGroups) {
    let resourceGroupActive = true;
    for (let tagCategory of activeTagCategories) {
      let hasCategory = false;
      for (let tag of tagCategory.tags) {
        if (!tagIds.has(tag.tagId)) continue;
        if (resourceGroup.tags.includes(tag)) {
          hasCategory = true;
          break;
        }
      }
      if (!hasCategory) {
        resourceGroupActive = false;
        break;
      }
    }
    if (resourceGroupActive) {
      infoGroupIds.add(resourceGroup.infoGroupId);
      resourceCategoryIds.add(resourceGroup.resourceCategoryId);
      for (let tagId of resourceGroup.tagIds) disabledTagIds.delete(tagId);
    }
  }

  return {
    disabledTagIds,
    resourceCategoryIds,
    infoGroupIds,
    tagCategoryIds,
    tagIds,
  };
};

export const sortOn = (prop) => (a, b) => a[prop] < b[prop] ? -1 : 1;

export const extractHref = (html) => {
  let href = html.match(/href="([^"]+)"/);
  if (href) return href[1];
  return null;
};

export const stripTags = (html) =>
  html.replace(/(<[^>]+>)/g, "").replace(/&nbsp;/g, " ");

export const htmlToJsx = (html) => {
  const paragraphs = [];
  for (let pText of html.split(/(\<\/p\>)|[\n\r]+/g)) {
    if (!pText) continue;
    const links = Array.from(pText.matchAll(/<a([^>]+)>([^<]+)<\/a>/g));
    const textNodes = pText.split(/<a[^<]+<\/a>/g);
    const paragraph = [];
    while (textNodes.length > 0) {
      paragraph.push(stripTags(textNodes.shift()));
      let link = links.shift();
      if (link) {
        let href = extractHref(link[1]);
        if (href) paragraph.push(<a href={href}>{link[2]}</a>);
      }
    }
    paragraphs.push(<p>{paragraph}</p>);
  }

  return paragraphs;
};
