import { useEffect, useState } from "preact/hooks";

export const ScrollToTop = ({ showAfterScroll = 300 }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollTop =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (
              document.documentElement ||
              document.body.parentNode ||
              document.body
            ).scrollTop;
      setVisible(scrollTop >= showAfterScroll);
    });
  }, []);

  return (
    <button
      class={`scroll-to-top ${visible ? "visible" : ""}`}
      title="Return to Top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      Return to Top
    </button>
  );
};
