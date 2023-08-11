import { useEffect, useId, useState } from "preact/hooks";
import style from "./style.css?inline";

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
  const getMode = () =>
    document.body.clientWidth >= 900 ? "desktop" : "mobile";

  const [mode, setMode] = useState(getMode());
  const [open, setOpen] = useState({});

  useEffect(() => {
    window.addEventListener("resize", () => setMode(getMode()));
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
