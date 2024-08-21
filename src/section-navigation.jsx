import { useEffect, useState } from "preact/hooks";

import Icon from "./icon";

export default function SectionNavigation({ prompt = "Jump To:" }) {
  const [sections, setSections] = useState([]);
  const updateSections = () => {
    const newSections = [];
    for (let heading of document.querySelectorAll("[data-section-title]"))
      newSections.push({
        icon: heading.dataset.sectionIcon,
        id: heading.id,
        title: heading.dataset.sectionTitle,
      });

    setSections(newSections);
  };
  useEffect(() => {
    updateSections();
    document.addEventListener("accessci-update-sections", updateSections);
  }, []);
  return (
    <nav class="section-navigation">
      {prompt ? <h2>{prompt}</h2> : null}
      <ul>
        {sections.map(({ icon, id, title }) => (
          <li>
            <a href={`#${id}`}>
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
  );
}
