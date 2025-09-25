import Breadcrumbs from "./breadcrumbs";
import { QABot } from "./qa-bot";
import { Footer } from "./footer";
import { Header } from "./header";
import { FooterMenus, Menus } from "./menu";
import { loginMenuItem, myAccessMenuItem, universalMenuItems } from "./items";
import { ResourceCatalog } from "./resource-catalog";
import { TableOfContents } from "./table-of-contents";
import { renderShadow } from "./utils";

import baseStyle from "./base.css?inline";
import breadcrumbsStyle from "./breadcrumbs.css?inline";
import contentStyle from "./content.css?inline";
import footerStyle from "./footer.css?inline";
import headerStyle from "./header.css?inline";
import logoStyle from "./logo.css?inline";
import menusStyle from "./menus.css?inline";
import resourceCatalogStyle from "./resource-catalog.css?inline";
import tocStyle from "./table-of-contents.css?inline";
import qaStyle from "../node_modules/@snf/access-qa-bot/build/static/css/main.css?inline";

const breadcrumbs = (params = {}) => {
  renderShadow(<Breadcrumbs {...params} />, params.target, [
    baseStyle,
    breadcrumbsStyle,
  ]);
};

const footer = (params = {}) => {
  renderShadow(<Footer {...params} />, params.target, [
    baseStyle,
    footerStyle,
    logoStyle,
  ]);
};

const header = (params = {}) => {
  renderShadow(<Header {...params} />, params.target, [
    baseStyle,
    logoStyle,
    headerStyle,
  ]);
};

const qaBot = ({ isLoggedIn, target, ...otherParams } = {}) => {
  if (isLoggedIn === undefined)
    isLoggedIn = document.cookie.split("; ").includes("SESSaccesscisso=1");

  renderShadow(
    <QABot isLoggedIn={isLoggedIn} target={target} {...otherParams} />,
    target,
    [baseStyle, qaStyle],
  );
};

const universalMenus = ({
  items,
  isLoggedIn,
  loginUrl,
  logoutUrl,
  siteName,
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
    let currentItem = items.find(
      (item) =>
        (item.href || "").replace(/\/$/, "") ==
        document.location.href.replace(/\/$/, ""),
    );
    if (siteName && !currentItem)
      currentItem = items.find((item) => item.name == siteName);
    if (currentItem) currentItem.classes += " active";
  }

  renderShadow(
    <Menus
      classes="universal"
      items={items}
      name="ACCESS Menu"
      target={target}
    />,
    target,
    [baseStyle, menusStyle],
  );
};

const siteMenus = ({ items, siteName, target }) =>
  renderShadow(
    <Menus
      classes="site"
      items={items}
      name={`${siteName} Menu`}
      target={target}
    />,
    target,
    [baseStyle, menusStyle],
  );

const footerMenus = ({ items, siteName, target }) =>
  renderShadow(<FooterMenus items={items} siteName={siteName} />, target, [
    baseStyle,
    menusStyle,
  ]);

const tableOfContents = ({ headings = [], target }) =>
  renderShadow(<TableOfContents headings={headings} />, target, [
    baseStyle,
    tocStyle,
  ]);

const resourceCatalog = ({
  accessId,
  baseUri,
  isLoggedIn,
  qaBotApiKey,
  showTitle,
  target,
  title,
}) =>
  renderShadow(
    <ResourceCatalog
      accessId={accessId}
      baseUri={baseUri}
      isLoggedIn={isLoggedIn}
      qaBotApiKey={qaBotApiKey}
      showTitle={showTitle}
      title={title}
    />,
    target,
    [baseStyle, contentStyle, resourceCatalogStyle, qaStyle],
  );

export {
  qaBot,
  breadcrumbs,
  footer,
  header,
  footerMenus,
  loginMenuItem,
  myAccessMenuItem,
  resourceCatalog,
  siteMenus,
  tableOfContents,
  universalMenuItems,
  universalMenus,
};
