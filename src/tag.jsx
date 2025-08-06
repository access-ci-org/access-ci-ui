import { defaultIcons } from "./icons";

import Icon from "./icon";

export function Tag({ active, tagCategory, tagId, iconUri, name, toggleTag }) {
  const icon = iconUri || defaultIcons[name] || "tag";
  return (
    <li
      className={`tag tag-category-${tagCategory.name
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
        {icon.startsWith("http") ? (
          <Icon alt={name} src={icon} />
        ) : (
          <Icon name={icon} />
        )}
        {name}
      </button>
    </li>
  );
}
