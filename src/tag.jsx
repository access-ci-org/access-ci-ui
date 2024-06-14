import { defaultIcons } from "./icons";

export function Tag({ active, tagCategory, tagId, iconUri, name, toggleTag }) {
  return (
    <li
      class={`tag tag-category-${tagCategory.name
        .toLowerCase()
        .replace(/[^a-z]+/g, "-")}${active.tagIds.has(tagId) ? " active" : ""}`}
    >
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          toggleTag(tagId);
        }}
      >
        {iconUri ? (
          <img src={iconUri} />
        ) : (
          defaultIcons[name] || defaultIcons.Tag
        )}
        {name}
      </a>
    </li>
  );
}
