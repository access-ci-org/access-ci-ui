import { useMemo, useState } from "preact/hooks";
import { useJSON } from "./utils";

import { Carousel, CarouselSlide } from "./carousel";
import { ResourceCategory } from "./resource-category";
import { ResourceFilters } from "./resource-filters";

const linkGroupData = ({
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

const getActive = ({ resourceGroups, tags, tagCategories }, activeTagIds) => {
  const resourceCategoryIds = new Set();
  const resourceGroupIds = new Set();
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
      resourceGroupIds.add(resourceGroup.resourceGroupId);
      resourceCategoryIds.add(resourceGroup.resourceCategoryId);
      for (let tagId of resourceGroup.tagIds) disabledTagIds.delete(tagId);
    }
  }

  return {
    disabledTagIds,
    resourceCategoryIds,
    resourceGroupIds,
    tagCategoryIds,
    tagIds,
  };
};

export function ResourceHome({ title, showTitle, slidesURI, groupsURI }) {
  const [activeTagIds, setActiveTagIds] = useState([]);
  const slides = useJSON(slidesURI, [], "slides");
  const allGroups = useJSON(groupsURI, null);
  const groups = useMemo(
    () => (allGroups ? linkGroupData(allGroups) : null),
    [allGroups]
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
      {slides.length ? (
        <Carousel>{slides.map((slide) => CarouselSlide(slide))}</Carousel>
      ) : null}

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
                clearTags={clearTags}
                toggleTag={toggleTag}
              />
            ))
        : null}
    </>
  );
}
