/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
  Breadcrumbs,
  Footer,
  FooterMenus,
  Header,
  QABot,
  ResourceCatalog,
  SiteMenus,
  TableOfContents,
  UniversalMenus,
} from "./shadow";

// eslint-disable-next-line no-unused-vars
const createRenderer = (Comp) => {
  return (params = {}) =>
    createRoot(params.target).render(
      <StrictMode>
        <Comp {...params} />
      </StrictMode>,
    );
};

export {
  Breadcrumbs,
  Footer,
  FooterMenus,
  Header,
  QABot,
  ResourceCatalog,
  SiteMenus,
  TableOfContents,
  UniversalMenus,
};
export { loginMenuItem, myAccessMenuItem, universalMenuItems } from "./items";

export const breadcrumbs = createRenderer(Breadcrumbs);
export const footer = createRenderer(Footer);
export const footerMenus = createRenderer(FooterMenus);
export const header = createRenderer(Header);
export const qaBot = createRenderer(QABot);
export const resourceCatalog = createRenderer(ResourceCatalog);
export const siteMenus = createRenderer(SiteMenus);
export const tableOfContents = createRenderer(TableOfContents);
export const universalMenus = createRenderer(UniversalMenus);
