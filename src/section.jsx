import { useLayoutEffect } from "preact/hooks";

import Icon from "./icon";

const fireUpdateEvent = () => {
  const event = new Event("accessci-update-sections");
  document.dispatchEvent(event);
};

export default function Section({
  children,
  headerComponents = null,
  icon = null,
  sectionId = null,
  title,
}) {
  const id = sectionId || title.toLowerCase().replace(/[^0-9a-z]+/g, "-");
  useLayoutEffect(() => {
    fireUpdateEvent();
    return fireUpdateEvent;
  }, []);
  return (
    <section id={id} data-section-title={title} data-section-icon={icon}>
      <div class="flex-header">
        <h2>
          {icon ? <Icon name={icon} /> : null}
          {title}
        </h2>
        {headerComponents}
      </div>
      {children}
    </section>
  );
}
