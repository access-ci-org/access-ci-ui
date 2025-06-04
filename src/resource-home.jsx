import { useMemo, useState } from "preact/hooks";
import { filterResourceGroups, useResourceGroups } from "./utils";

import Breadcrumbs from "./breadcrumbs";
import { ResourceCategory } from "./resource-category";
import { ResourceFilters } from "./resource-filters";
import { ResourcePathways } from "./resource-pathways";
import { QABot } from "./qa-bot";

export default function ResourceHome({
  baseUri,
  title,
  showBreadcrumbs = true,
  showTitle = true,
}) {
  const [activeTagIds, setActiveTagIds] = useState([]);
  const [botOpen, setBotOpen] = useState(false);
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

  // Auto-detect login state
  const isLoggedIn = document.cookie.split("; ").includes("SESSaccesscisso=1");

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

      <QABot
        embedded={false}
        open={botOpen}
        onOpenChange={setBotOpen}
        isLoggedIn={isLoggedIn}
        welcome="Welcome to the ACCESS Q&A Bot!"
        apiKey={import.meta.env.VITE_QA_BOT_API_KEY || "my-api-key"}
      />
    </>
  );
}
