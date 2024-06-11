import { defaultIcons } from "./icons";

export function Tag({
  active = false,
  collection = "tags",
  icon = "default",
  name,
}) {
  return (
    <li class={`tag collection-${collection}${active ? " active" : ""}`}>
      <a href="#">
        {icon.startsWith("http") ? (
          <img src={icon} />
        ) : (
          defaultIcons[name] || defaultIcons.Tag
        )}
        {name}
      </a>
    </li>
  );
}
