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
  const responses = useJSON(
    [
      "https://operations-api.access-ci.org/wh2/cider/v1/groups/group_type/resource-catalog.access-ci.org/",
      "https://operations-api.access-ci.org/wh2/cider/v2/access-active/",
    ],
    { defaultValue: [] }
  );
  return useTransform(responses, (allGroups, allResources) => {
    const resourceGroups = allGroups.results
      .filter((group) => group.info_resourceids)
      .map((group) => ({
        infoGroupId: group.info_groupid,
        name: group.group_descriptive_name,
        description: group.group_description,
        infoResourceIds: group.info_resourceids,
        imageUri: group.group_logo_url
          ? `https://cider.access-ci.org/public/groups/${
              group.group_logo_url.match(/[0-9]+/)[0]
            }/logo`
          : null,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
    return linkResourceGroups(resourceGroups, allResources.results);
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

export const linkResourceGroups = (resourceGroups, resources) => {
  const tagCategories = [
    {
      tagCategoryId: 1,
      name: "Resource Provider",
      tags: [],
    },
  ];
  const resourceCategories = [
    {
      resourceCategoryId: 1,
      name: "Compute & Storage Resources",
      resourceGroups: [],
      resourceGroupIds: [],
    },
  ];
  let nextTagId = 1;
  const tags = [];
  const rpTagMap = {};
  const resourceMap = makeMap(resources, "info_resourceid");
  const tagCategoryMap = makeMap(tagCategories, "tagCategoryId");
  const resourceCategoryMap = makeMap(resourceCategories, "resourceCategoryId");

  for (let resourceGroup of resourceGroups) {
    resourceGroup.infoGroupId = resourceGroup.infoGroupId;
    resourceGroup.tags = [];
    resourceGroup.tagIds = [];
    for (let infoResourceId of resourceGroup.infoResourceIds) {
      let resource = resourceMap[infoResourceId];
      if (!resource) continue;
      if (resource.organization_name) {
        let tag = rpTagMap[resource.organization_name];
        if (!tag) {
          tag = {
            tagId: nextTagId++,
            tagCategoryId: 1,
            name: resource.organization_name,
          };
          tags.push(tag);
          rpTagMap[resource.organization_name] = tag;
          tagCategoryMap[1].tags.push(tag);
          tag.tagCategory = tagCategoryMap[1];
        }
        if (!resourceGroup.tagIds.includes(tag.tagId)) {
          resourceGroup.tagIds.push(tag.tagId);
          resourceGroup.tags.push(tag);
        }
      }
    }
    resourceGroup.resourceCategoryId = 1;
    resourceGroup.resourceCategory = resourceCategoryMap[1];
    resourceGroup.resourceCategory.resourceGroups.push(resourceGroup);
    resourceGroup.resourceCategory.resourceGroupIds.push(
      resourceGroup.infoGroupId
    );
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
  for (let pText of html.split("</p>")) {
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
