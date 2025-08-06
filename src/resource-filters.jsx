import { useEffect, useRef, useState } from "react";

import { Tag } from "./tag";
import { Tags } from "./tags";
import Icon from "./icon";

export function ResourceFilters({
  active,
  clearTags,
  tagCategories,
  toggleTag,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const button = useRef(null);
  useEffect(() => {
    const handleBodyClick = () => setIsOpen(false);
    document.body.addEventListener("click", handleBodyClick);

    return () => document.body.removeEventListener("click", handleBodyClick);
  }, []);

  return (
    <section
      className="filters-outer"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <button
        ref={button}
        onClick={() => setIsOpen(!isOpen)}
        className={`btn-filters btn ${isOpen ? "active" : ""}`}
      >
        <Icon name="filter" /> Filters
        {active.tagIds.size > 0 ? (
          <span className="active-tag-count">{active.tagIds.size}</span>
        ) : null}
      </button>
      {isOpen ? (
        <div className="filters-inner">
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
            className="btn danger"
          >
            <Icon name="trash" /> Clear Filters
          </button>
        </div>
      ) : null}
    </section>
  );
}
