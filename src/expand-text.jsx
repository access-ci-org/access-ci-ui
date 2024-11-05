import { useState } from "preact/hooks";

import Icon from "./icon";

export default function ExpandText({ children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div class={`expand-text ${expanded ? "expanded" : "contracted"}`}>
      {children}
      <button class="expand-button" onClick={() => setExpanded(!expanded)}>
        <Icon name={`caret-${expanded ? "up" : "left"}-fill`} />
        {expanded ? "Less" : "More"}
      </button>
    </div>
  );
}
