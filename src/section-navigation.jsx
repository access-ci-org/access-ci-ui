import { useEffect, useRef, useState } from "react";

import Icon from "./icon";

export default function SectionNavigation({ prompt = "Jump To:" }) {
  const [sections, setSections] = useState([]);
  const container = useRef(null);

  const updateSections = () => {
    const newSections = [];
    for (let heading of container.current.querySelectorAll(
      "[data-section-title]",
    ))
      newSections.push({
        icon: heading.dataset.sectionIcon,
        id: heading.id,
        title: heading.dataset.sectionTitle,
      });

    setSections(newSections);
  };

  const scrollToSection = (sectionId) => {
    const section = container.current.querySelector(`#${sectionId}`);
    if (section) section.scrollIntoView();
  };

  useEffect(() => {
    if (!container.current) return;
    updateSections();
    document.addEventListener("accessci-update-sections", updateSections);
  }, [container.current]);

  return (
    <div ref={(el) => (container.current = el?.parentElement)}>
      {sections.length >= 2 ? (
        <nav className="section-navigation">
          {prompt ? <h2>{prompt}</h2> : null}
          <ul>
            {sections.map(({ icon, id, title }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(id);
                  }}
                >
                  {icon ? (
                    <>
                      <Icon name={icon} />{" "}
                    </>
                  ) : null}
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
