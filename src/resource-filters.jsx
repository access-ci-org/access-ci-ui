import { useLayoutEffect, useRef, useState } from "preact/hooks";
import { defaultIcons } from "./icons";

import { Tag } from "./tag";
import { Tags } from "./tags";
import Icon from "./icon";

export function ResourceFilters({
  active,
  clearTags,
  tagCategories,
  toggleTag,
}) {
  const [open, setOpen] = useState(false);
  const outer = useRef(null);
  useLayoutEffect(() => {
    if (outer.current) {
      outer.current.addEventListener("click", (e) => e.stopPropagation());
      document.body.addEventListener("click", () => setOpen(false));
    }
  }, [outer.current]);

  return (
    <section class="filters-outer" ref={outer}>
      <button
        onClick={() => setOpen(!open)}
        class={`btn-filters btn ${open ? "active" : ""}`}
      >
        Filters
        {active.tagIds.size > 0 ? (
          <span class="active-tag-count">{active.tagIds.size}</span>
        ) : null}
      </button>
      {open ? (
        <div class="filters-inner">
          {tagCategories.map((tagCategory) => (
            <>
              <h2>{tagCategory.name}</h2>
              <Tags>
                {tagCategory.tags.map((tag) => (
                  <Tag {...tag} active={active} toggleTag={toggleTag} />
                ))}
              </Tags>
            </>
          ))}
          <button
            onClick={clearTags}
            disabled={active.tagIds.size == 0}
            class="btn danger"
          >
            <Icon name="trash" /> Clear Filters
          </button>
        </div>
      ) : null}
    </section>
  );
}
