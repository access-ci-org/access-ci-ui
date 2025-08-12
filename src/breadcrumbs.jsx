import homeIconUrl from "./icons/house-door-fill.svg";

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
      className={`breadcrumbs ${expandWidth ? "expand" : ""} ${
        topBorder ? "top-border" : ""
      }`}
    >
      <li className="home" key="home">
        <a href={homeUrl} title={homeTitle}>
          <img src={homeIconUrl} alt={homeTitle} height="14" />
        </a>
      </li>
      {items.map((item) => (
        <li className={item.classes || ""} key={item.name}>
          {item.href ? <a href={item.href}>{item.name}</a> : item.name}
        </li>
      ))}
    </ul>
  );
}
