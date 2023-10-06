import { useEffect, useId, useState } from "preact/hooks";
import style from "./style.css?inline";

const getMode = (breakpoint = 900) =>
  document.body.clientWidth >= breakpoint ? "desktop" : "mobile";

const useMode = (breakpoint = 900) => {
  const [mode, setMode] = useState(getMode(breakpoint));
  useEffect(() => {
    window.addEventListener("resize", () => setMode(getMode(breakpoint)));
  }, []);
  return mode;
};

export const Menu = ({
  autoOpenMode,
  classes = "",
  href = "",
  html = "",
  items,
  mode,
  name,
  open,
  parentId = "root",
  setOpen,
}) => {
  const id = useId();
  const isOpenChild = open[parentId] == id;
  const expanded = isOpenChild || autoOpenMode == mode;

  const toggleOpen = () =>
    setOpen({ ...open, [parentId]: isOpenChild ? null : id });

  if (html) return <div dangerouslySetInnerHTML={{ __html: html }}></div>;

  if (href)
    return (
      <a href={href} class={`acim-item ${classes || ""}`}>
        {name}
      </a>
    );
  if (items)
    return (
      <>
        {name && (
          <button
            aria-expanded={expanded}
            aria-controls={id}
            class={`acim-item ${expanded ? "acim-expanded" : "acim-collapsed"}`}
            onClick={toggleOpen}
          >
            {name}
          </button>
        )}
        <ul class={classes} id={id} hidden={!expanded} aria-hidden={!expanded}>
          {items.map(({ autoOpenMode, classes, href, html, items, name }) => (
            <li class={classes || ""}>
              <Menu
                autoOpenMode={autoOpenMode}
                href={href}
                html={html}
                items={items}
                mode={mode}
                name={name}
                open={open}
                parentId={id}
                setOpen={setOpen}
              />
            </li>
          ))}
        </ul>
      </>
    );
};

export const Menus = ({ classes, items, name, target }) => {
  const mode = useMode();
  const [open, setOpen] = useState({});

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target == target) return;
      if (getMode() == "desktop") setOpen({});
    });
    target.addEventListener("keydown", ({ key }) => {
      if (key == "Escape") setOpen({});
    });
  }, []);

  return (
    <>
      <nav class={`acim-menu ${classes || ""}`}>
        <Menu
          autoOpenMode="desktop"
          items={items}
          mode={mode}
          name={name}
          open={open}
          setOpen={setOpen}
        />
      </nav>
      <style>{style}</style>
    </>
  );
};

export const FooterMenus = ({ items }) => {
  const mode = useMode(768);

  const menus = items.map(({ name, href, items }) => {
    if (mode == "mobile")
      while (!href) {
        href = items[0].href;
        items = items[0];
      }
    if (href)
      return (
        <div class="acim-column">
          <h2>
            <a href={href}>{name}</a>
          </h2>
        </div>
      );
    return (
      <div class="acim-column">
        <h2>{name}</h2>
        <ul>
          {items.map(({ name, href }) => (
            <li>
              <a href={href}>{name}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  });

  return (
    <>
      <nav class="acim-footer">
        <div class="acim-columns">{menus}</div>
      </nav>
      <style>{style}</style>
    </>
  );
};
