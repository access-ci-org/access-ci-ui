import { useMemo, useState } from "preact/hooks";
import { filterResourceGroups, useResourceGroups } from "./utils";

import Breadcrumbs from "./breadcrumbs";
import { ResourceCategory } from "./resource-category";
import { ResourcePathways } from "./resource-pathways";
import { ResourceSearch } from "./resource-search";

export default function ResourceHome({
  baseUri,
  title,
  showBreadcrumbs = true,
  showTitle = true,
}) {
  const [activeTagIds, setActiveTagIds] = useState([]);
  const groups = useResourceGroups();
  const active = useMemo(
    () => (groups ? filterResourceGroups(groups, activeTagIds) : null),
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
      {showBreadcrumbs && (
        <Breadcrumbs
          expandWidth={true}
          items={[{ name: "Resources" }]}
          topBorder={true}
        />
      )}
      {title && <h1 class={showTitle ? "" : "visually-hidden"}>{title}</h1>}
      <ResourcePathways />
      <div id="browse-resources">
        {active ? <ResourceSearch /> : null}
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
