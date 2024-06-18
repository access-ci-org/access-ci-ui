import { useLayoutEffect, useRef, useState } from "preact/hooks";

import { Tag } from "./tag";
import { Tags } from "./tags";

export function ResourceFilters({ active, tagCategories, toggleTag }) {
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
      <button onClick={() => setOpen(!open)} class="filters btn-lite">
        Filters
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
        </div>
      ) : null}
    </section>
  );
}
