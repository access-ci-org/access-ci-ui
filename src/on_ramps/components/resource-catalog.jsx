import {ResourceCategory} from "../../resource-category.jsx";
import {filterResourceGroups, useResourceGroups} from "../../utils.jsx";
import {ResourceFilters} from "../../resource-filters.jsx";
import { useMemo, useState } from "preact/hooks";
export function ResourceCatalog({
  title = "Resources",
  showTitle = true,
  baseUri = "/access-ci-ui",
}) {
  const [activeTagIds, setActiveTagIds] = useState([]);
  const clearTags = () => setActiveTagIds([]);
  const toggleTag = (tagId) =>
      setActiveTagIds(
          activeTagIds.includes(tagId)
              ? activeTagIds.filter((id) => id != tagId)
              : [...activeTagIds, tagId],
      );

  const groups = useResourceGroups();
  const active = useMemo(
      () => (groups ? filterResourceGroups(groups, activeTagIds) : null),
      [groups, activeTagIds],
  );
  return (
      <div id="browse-resources">
        {/*            <ResourceFilters
                tagCategories={groups.tagCategories}
                active={active}
                clearTags={clearTags}
                toggleTag={toggleTag}
            />*/}
        {groups
            ? groups.resourceCategories
                .filter(({ resourceCategoryId }) =>
                    active.resourceCategoryIds.has(resourceCategoryId),
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
  );
}
