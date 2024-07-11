import { useLayoutEffect, useRef } from "preact/hooks";

export default function Search({
  delay = 300,
  placeholder,
  setText,
  width = "30%",
}) {
  const input = useRef(null);
  const timeout = useRef(null);
  useLayoutEffect(() => {
    if (input.current)
      input.current.addEventListener("keyup", () => {
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          timeout.current = null;
          setText(input.current.value);
        }, delay);
      });
  }, [input.current]);

  return <input placeholder={placeholder} style={{ width }} ref={input} />;
}
