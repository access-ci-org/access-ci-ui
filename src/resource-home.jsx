import { useMemo, useState } from "preact/hooks";
import { useJSON } from "./utils";

import { Carousel, CarouselSlide } from "./carousel";
import { ResourceCategory } from "./resource-category";
import { ResourceFilters } from "./resource-filters";
import { ResourcePathways } from "./resource-pathways";

const makeMap = (items, key) => {
  const map = {};
  for (let item of items) map[item[key]] = item;
  return map;
};

const linkGroupData = ({ groups: resourceGroups }, { results: resources }) => {
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
    resourceGroup.infoGroupId = resourceGroup.infoGroupid;
    resourceGroup.tags = [];
    resourceGroup.tagIds = [];
    for (let infoResourceId of resourceGroup.infoResourceids) {
      let resource = resourceMap[infoResourceId];
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

const getActive = ({ resourceGroups, tags, tagCategories }, activeTagIds) => {
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

export default function ResourceHome({
  baseUri,
  title,
  showTitle,
  slidesURI,
  groupsURI,
}) {
  const [activeTagIds, setActiveTagIds] = useState([]);
  const slides = useJSON(`${baseUri}${slidesURI}`, null);
  const allGroups = useJSON(`${baseUri}${groupsURI}`, null);
  const allResources = useJSON(
    "https://operations-api.access-ci.org/wh2/cider/v2/access-active/"
  );
  const groups = useMemo(
    () =>
      allGroups && !allGroups.error && allResources && !allResources.error
        ? linkGroupData(allGroups, allResources)
        : null,
    [allGroups, allResources]
  );
  const active = useMemo(
    () => (groups ? getActive(groups, activeTagIds) : null),
    [groups, activeTagIds]
  );

  const toggleTag = (tagId) =>
    setActiveTagIds(
      activeTagIds.includes(tagId)
        ? activeTagIds.filter((id) => id != tagId)
        : [...activeTagIds, tagId]
    );

  const clearTags = () => setActiveTagIds([]);

  return (
    <>
      {title && <h1 class={showTitle ? "" : "visually-hidden"}>{title}</h1>}
      <ResourcePathways />
      {slides && slides.slides.length ? (
        <Carousel>
          {slides.slides.map((slide) => CarouselSlide(slide))}
        </Carousel>
      ) : null}
      <div id="browse-resources">
        {active ? (
          <ResourceFilters
            tagCategories={groups.tagCategories}
            active={active}
            clearTags={clearTags}
            toggleTag={toggleTag}
          />
        ) : null}
        {groups
          ? groups.resourceCategories
              .filter(({ resourceCategoryId }) =>
                active.resourceCategoryIds.has(resourceCategoryId)
              )
              .map((resourceCategory) => (
                <ResourceCategory
                  {...resourceCategory}
                  active={active}
                  baseUri={baseUri}
                  clearTags={clearTags}
                  toggleTag={toggleTag}
                />
              ))
          : null}
      </div>
    </>
  );
}
