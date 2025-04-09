import { useEffect, useState } from "preact/hooks";
import { getScrollTop } from "./utils";

export const TableOfContents = ({
  headings = [],
  idPrefix = "",
  smoothScroll = true,
}) => {
  const [activeIdx, setActiveIdx] = useState(-1);

  let h1;
  const h2 = [];
  headings.forEach((h) => {
    if (h.tagName == "H1") h1 = h;
    else if (h.tagName == "H2") {
      h2.push(h);
      if (!h.id)
        h.id =
          idPrefix + h.textContent.replace(/[^A-Za-z0-9]+/g, "-").toLowerCase();
    }
  });

  useEffect(() => {
    if (h2.length)
      window.addEventListener("scroll", function () {
        const threshold = getScrollTop() + window.innerHeight * 0.1;
        let newActiveIdx = -1;
        h2.forEach((h, i) => {
          if (h.offsetTop < threshold) {
            newActiveIdx = i;
            return false;
          }
        });
        setActiveIdx(newActiveIdx);
      });
  }, []);

  if (!h2.length) return;

  return (
    <div class="toc">
      {h1 && <h2>{h1.textContent}</h2>}
      {h2.length > 0 && (
        <ul>
          {h2.map((h, i) => (
            <li>
              <a
                href={`#${h.id}`}
                class={i == activeIdx ? "active" : ""}
                onClick={(e) => {
                  if (smoothScroll) {
                    e.preventDefault();
                    window.scrollTo({
                      top: h.offsetTop,
                      behavior: "smooth",
                    });
                    history.pushState(null, null, `#${h.id}`);
                  }
                }}
              >
                {h.textContent}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
