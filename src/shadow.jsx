import Root from "react-shadow";
import BreadcrumbsBase from "./breadcrumbs";
import { QABot as QABotBase } from "./qa-bot";
import { Footer as FooterBase } from "./footer";
import { Header as HeaderBase } from "./header";
import {
  FooterMenus as FooterMenusBase,
  SiteMenus as SiteMenusBase,
  UniversalMenus as UniversalMenusBase,
} from "./menu";

import { ResourceCatalog as ResourceCatalogBase } from "./resource-catalog";
import { TableOfContents as TableOfContentsBase } from "./table-of-contents";

import baseStyle from "./base.css?inline";
import breadcrumbsStyle from "./breadcrumbs.css?inline";
import contentStyle from "./content.css?inline";
import footerStyle from "./footer.css?inline";
import headerStyle from "./header.css?inline";
import logoStyle from "./logo.css?inline";
import menusStyle from "./menus.css?inline";
import resourceCatalogStyle from "./resource-catalog.css?inline";
import tocStyle from "./table-of-contents.css?inline";
import rcbStyle from "../node_modules/react-chatbotify/dist/style.css?inline";
import qaStyleOverrides from "../node_modules/@snf/access-qa-bot/dist/style.css?inline";
import localQaStyles from "./qa-bot.css?inline";
const qaStyle = rcbStyle + qaStyleOverrides + localQaStyles;

const shadowize = (Comp, styles) => {
  return (props) => {
    return (
      <Root.div>
        <Comp {...props} />
        {styles.map((style) => (
          <style key={style}>{style}</style>
        ))}
      </Root.div>
    );
  };
};

export const Breadcrumbs = shadowize(BreadcrumbsBase, [
  baseStyle,
  breadcrumbsStyle,
]);
export const Footer = shadowize(FooterBase, [
  baseStyle,
  footerStyle,
  logoStyle,
]);
export const FooterMenus = shadowize(FooterMenusBase, [baseStyle, menusStyle]);
export const Header = shadowize(HeaderBase, [
  baseStyle,
  logoStyle,
  headerStyle,
]);
export const QABot = shadowize(QABotBase, [baseStyle, qaStyle]);
export const ResourceCatalog = shadowize(ResourceCatalogBase, [
  baseStyle,
  contentStyle,
  resourceCatalogStyle,
  qaStyle,
]);
export const SiteMenus = shadowize(SiteMenusBase, [baseStyle, menusStyle]);
export const TableOfContents = shadowize(TableOfContentsBase, [
  baseStyle,
  tocStyle,
]);
export const UniversalMenus = shadowize(UniversalMenusBase, [
  baseStyle,
  menusStyle,
]);
