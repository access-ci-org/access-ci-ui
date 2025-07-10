import { defaultIcons } from "./icons";

import Icon from "./icon";

export function Tag({
  active = false,
  disabled = false,
  tagCategory,
  tagId,
  iconUri,
  name,
  onClick,
}) {
  const icon = iconUri || defaultIcons[name] || "tag";
  return (
    <li
      class={`tag tag-category-${tagCategory.name
        .toLowerCase()
        .replace(/[^a-z]+/g, "-")}${active ? " active" : ""}`}
    >
      <button
        href="#"
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault();
          onClick(tagId);
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
