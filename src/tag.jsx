import { defaultIcons } from "./icons";

import Icon from "./icon";

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
          <Icon alt={name} src={iconUri} />
        ) : (
          <Icon name={defaultIcons[name] || "tag"} />
        )}
        {name}
      </button>
    </li>
  );
}
