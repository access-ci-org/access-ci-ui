import { defaultIcons } from "./icons";

export function Tag({ active, tagCategory, tagId, iconUri, name, toggleTag }) {
  return (
    <li
      class={`tag tag-category-${tagCategory.name
        .toLowerCase()
        .replace(/[^a-z]+/g, "-")}${active.tagIds.has(tagId) ? " active" : ""}`}
    >
      <button
        href="#"
        disabled={active.disabledTagIds.has(tagId)}
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
      </button>
    </li>
  );
}
