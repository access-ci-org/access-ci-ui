import { useState } from "react";

import Icon from "./icon";

export default function ExpandText({ children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`expand-text ${expanded ? "expanded" : "contracted"}`}>
      {children}
      <button className="expand-button" onClick={() => setExpanded(!expanded)}>
        <Icon name={`caret-${expanded ? "up" : "left"}-fill`} />
        {expanded ? "Less" : "More"}
      </button>
    </div>
  );
}
