import { useEffect, useId, useState } from "preact/hooks";
import { getMode, useMode } from "./utils";

import { LinksList } from "./links-list";

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
      <a href={href} class={`item ${classes || ""}`}>
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
            class={`item ${expanded ? "expanded" : "collapsed"}`}
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
  const mode = useMode(1280);
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
    <nav class={`menu ${classes || ""}`}>
      <Menu
        autoOpenMode="desktop"
        items={items}
        mode={mode}
        name={name}
        open={open}
        setOpen={setOpen}
      />
    </nav>
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
        <div class="column">
          <h2>
            <a href={href}>{name}</a>
          </h2>
        </div>
      );
    return (
      <div class="column">
        <h2>{name}</h2>
        <LinksList items={items} />
      </div>
    );
  });

  return (
    <nav class="footer">
      <div class="columns">{menus}</div>
    </nav>
  );
};
