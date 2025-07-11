import { defaultIcons } from "./icons";

import Icon from "./icon";
import Tooltip from "./tooltip";

export function Tag({
  active = false,
  disabled = false,
  tagCategory,
  tagId,
  iconUri,
  name,
  onClick,
  tooltip,
}) {
  const icon = iconUri || defaultIcons[name] || "tag";
  const button = (
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
  );
  return (
    <li
      class={`tag tag-category-${tagCategory.name
        .toLowerCase()
        .replace(/[^a-z]+/g, "-")}${active ? " active" : ""}`}
    >
      {tooltip ? <Tooltip tooltip={tooltip}>{button}</Tooltip> : button}
    </li>
  );
}
