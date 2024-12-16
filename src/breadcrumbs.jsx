import homeIconUrl from "./icons/home.svg";

export default function Breadcrumbs({
  expandWidth = false,
  homeTitle = "ACCESS Home",
  homeUrl = "https://access-ci.org/",
  items = [],
  topBorder = false,
}) {
  if (!items || !items.length) return;
  return (
    <ul
      class={`breadcrumbs ${expandWidth ? "expand" : ""} ${
        topBorder ? "top-border" : ""
      }`}
    >
      <li class="home">
        <a href={homeUrl} title={homeTitle}>
          <img src={homeIconUrl} alt={homeTitle} height="14" />
        </a>
      </li>
      {items.map((item) => (
        <li class={item.classes || ""}>
          {item.href ? <a href={item.href}>{item.name}</a> : item.name}
        </li>
      ))}
    </ul>
  );
}
