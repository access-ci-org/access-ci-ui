import { useLayoutEffect, useRef } from "react";
import tippy from "tippy.js";

export default function Tooltip({ children, tooltip }) {
  const trigger = useRef(null);

  useLayoutEffect(() => {
    if (!trigger.current) {
      return;
    }

    const instance = tippy(trigger.current, {
      content: tooltip,
      theme: "access",
      appendTo: trigger.current.parentElement,
      // trigger: "mouseenter focus",
    });

    return () => {
      instance.destroy();
    };
  }, [tooltip]);

  return (
    <span ref={trigger} tabIndex="0">
      {children}
    </span>
  );
}
