import Icon from "./icon";

export default function Section({
  children,
  headerComponents = null,
  icon = null,
  sectionId = null,
  title,
}) {
  const id = sectionId || title.toLowerCase().replace(/[^0-9a-z]+/g, "-");
  return (
    <>
      <div class="flex-header">
        <h2 id={id}>
          {icon ? <Icon name={icon} /> : null}
          {title}
        </h2>
        {headerComponents}
      </div>
      {children}
    </>
  );
}
