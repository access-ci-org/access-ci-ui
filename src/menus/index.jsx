import { render } from "preact";
import { Menus } from "./menu";
import { loginMenuItem, myAccessMenuItem, universalMenuItems } from "./items";

const renderShadow = (content, target) => {
  const shadow = target.attachShadow({ mode: "open" });
  render(content, shadow);
};

const universalMenus = ({
  items,
  isLoggedIn,
  loginUrl,
  logoutUrl,
  target,
} = {}) => {
  if (isLoggedIn === undefined)
    isLoggedIn = document.cookie.split("; ").includes("SESSaccesscisso=1");

  if (items === undefined) {
    const lastItem = { ...(isLoggedIn ? myAccessMenuItem : loginMenuItem) };
    lastItem.items = lastItem.items.map((item) => ({
      ...item,
      href:
        (item.name == "Login" && loginUrl) ||
        (item.name == "Log out" && logoutUrl) ||
        item.href,
    }));

    items = [...universalMenuItems, lastItem];
  }

  renderShadow(
    <Menus
      classes="acim-universal"
      items={items}
      name="ACCESS Menu"
      target={target}
    />,
    target
  );
};

const siteMenus = ({ items, siteName, target }) => {
  renderShadow(
    <Menus
      classes="acim-site"
      items={items}
      name={`${siteName} Menu`}
      target={target}
    />,
    target
  );
};

export {
  loginMenuItem,
  myAccessMenuItem,
  siteMenus,
  universalMenuItems,
  universalMenus,
};
