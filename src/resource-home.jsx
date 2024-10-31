import { useMemo, useState } from "preact/hooks";
import { filterResourceGroups, useJSON, useResourceGroups } from "./utils";

import { Carousel, CarouselSlide } from "./carousel";
import { ResourceCategory } from "./resource-category";
import { ResourceFilters } from "./resource-filters";
import { ResourcePathways } from "./resource-pathways";

export default function ResourceHome({ baseUri, title, showTitle, slidesURI }) {
  const [activeTagIds, setActiveTagIds] = useState([]);
  const slides = useJSON(`${baseUri}${slidesURI}`);
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
