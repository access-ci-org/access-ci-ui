import { useEffect, useState } from "react";
import { getScrollTop } from "./utils";

export const ScrollToTop = ({ showAfterScroll = 300 }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () =>
      setVisible(getScrollTop() >= showAfterScroll),
    );
  }, []);

  return (
    <button
      className={`scroll-to-top ${visible ? "visible" : ""}`}
      title="Return to Top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      Return to Top
    </button>
  );
};
