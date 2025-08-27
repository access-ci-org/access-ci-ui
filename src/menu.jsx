import { useEffect, useId, useState } from "react";
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
  onClick,
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

  if (href || onClick)
    return (
      <a
        href={href || "#"}
        onClick={onClick}
        className={`item ${classes || ""}`}
      >
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
            className={`item ${expanded ? "expanded" : "collapsed"}`}
            onClick={toggleOpen}
          >
            {name}
          </button>
        )}
        <ul
          className={classes}
          id={id}
          hidden={!expanded}
          aria-hidden={!expanded}
        >
          {items.map(
            ({ autoOpenMode, classes, href, html, items, name, onClick }) => (
              <li className={classes || ""} key={name || html}>
                <Menu
                  autoOpenMode={autoOpenMode}
                  href={href}
                  html={html}
                  items={items}
                  mode={mode}
                  name={name}
                  onClick={onClick}
                  open={open}
                  parentId={id}
                  setOpen={setOpen}
                />
              </li>
            ),
          )}
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
    <nav className={`menu ${classes || ""}`}>
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

export const FooterMenus = ({ items, siteName = "" }) => {
  const mode = useMode(768);

  const menus = items.map(({ name, href, items }) => {
    if (mode == "mobile")
      while (!href) {
        href = items[0].href;
        items = items[0];
      }
    if (href)
      return (
        <div className="column" key={name}>
          <h3>
            <a href={href}>{name}</a>
          </h3>
        </div>
      );
    return (
      <div className="column" key={name}>
        <h3>{name}</h3>
        <LinksList items={items} />
      </div>
    );
  });

  return (
    <nav className="footer">
      <h2>ACCESS {siteName}</h2>
      <div className="columns">{menus}</div>
    </nav>
  );
};
