import { useState } from "preact/hooks";

import Icon from "./icon";

export default function Accordion({ children, headingLevel = 2, title }) {
  const [open, setOpen] = useState(false);
  const Heading = `h${headingLevel}`;
  return (
    <div class="accordion">
      <Heading class="accordion-heading">
        <button aria-expanded={open} onClick={() => setOpen(!open)}>
          {title}
          <Icon name={open ? "caret-up-fill" : "caret-down-fill"} />
        </button>
      </Heading>
      <div
        class="accordion-content"
        style={{ display: open ? "block" : "none" }}
      >
        {children}
      </div>
    </div>
  );
}
