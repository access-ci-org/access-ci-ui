import { useLayoutEffect, useRef, useState } from "react";

import Icon from "./icon";

export default function Search({
  delay = 300,
  placeholder,
  setSearchText,
  width = "calc(var(--width) / 4)",
}) {
  const input = useRef(null);
  const timeout = useRef(null);
  const [text, setText] = useState("");
  const clearSearch = () => {
    setText("");
    setSearchText("");
    input.current.value = "";
    input.current.focus();
  };

  useLayoutEffect(() => {
    if (input.current)
      input.current.addEventListener("keyup", () => {
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          timeout.current = null;
          setSearchText(input.current.value);
          setText(input.current.value);
        }, delay);
      });
  }, [input.current]);

  return (
    <>
      <div className="search">
        <input placeholder={placeholder} style={{ width }} ref={input} />
        {text.length ? (
          <button
            className="btn btn-clear"
            title="Clear search"
            onClick={clearSearch}
          >
            <Icon name="x-lg" />
          </button>
        ) : null}
      </div>
    </>
  );
}
