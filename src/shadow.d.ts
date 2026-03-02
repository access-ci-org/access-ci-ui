import { FC } from "react";

export interface BreadcrumbItem {
  name: string;
  href?: string;
  classes?: string;
}

export interface BreadcrumbsProps {
  expandWidth?: boolean;
  homeTitle?: string;
  homeUrl?: string;
  items?: BreadcrumbItem[];
  topBorder?: boolean;
}

export interface FooterProps {
  /** Scroll distance in pixels before the "Return to Top" button appears. Default: 300 */
  showAfterScroll?: number;
}

export interface HeaderProps {
  nsfUrl?: string;
  /** Where the logo is placed; affects layout. Default: "header" */
  placement?: string;
  siteName?: string;
  siteUrl?: string;
}

export interface MenuItem {
  name?: string;
  href?: string;
  /** Raw HTML string to render in place of a standard link or submenu. */
  html?: string;
  items?: MenuItem[];
  classes?: string;
  autoOpenMode?: string;
  onClick?: () => void;
}

export interface FooterMenusProps {
  items: MenuItem[];
  siteName?: string;
}

export interface SiteMenusProps {
  items: MenuItem[];
  siteName: string;
  target?: string;
}

export interface UniversalMenusProps {
  /** Overrides the default ACCESS universal menu items. */
  items?: MenuItem[];
  /** Defaults to detecting the ACCESS SSO cookie when not provided. */
  isLoggedIn?: boolean;
  loginUrl?: string;
  logoutUrl?: string;
  siteName?: string;
  target?: string;
}

export interface QABotProps {
  welcome?: string;
  /** Defaults to detecting the ACCESS SSO cookie when not provided. */
  isLoggedIn?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Falls back to the VITE_QA_BOT_API_KEY environment variable when not provided. */
  apiKey?: string;
  embedded?: boolean;
  loginUrl?: string;
  userEmail?: string;
  userName?: string;
  accessId?: string;
  onAnalyticsEvent?: (...args: unknown[]) => void;
  qaEndpoint?: string;
  ratingEndpoint?: string;
}

export interface ResourceCatalogProps {
  accessId?: string;
  /** Base URL path for the resource catalog routes. Default: "/resources" */
  baseUri?: string;
  /** Defaults to detecting the ACCESS SSO cookie when not provided. */
  isLoggedIn?: boolean;
  qaBotApiKey?: string;
  showTitle?: boolean;
  title?: string;
}

export interface TableOfContentsProps {
  /** Array of heading elements to build the TOC from. H1 is used as the TOC title; H2s become the links. */
  headings?: HTMLElement[];
  /** Prefix applied to auto-generated heading IDs. Default: "" */
  idPrefix?: string;
  smoothScroll?: boolean;
}

export declare const Breadcrumbs: FC<BreadcrumbsProps>;
export declare const Footer: FC<FooterProps>;
export declare const FooterMenus: FC<FooterMenusProps>;
export declare const Header: FC<HeaderProps>;
export declare const QABot: FC<QABotProps>;
export declare const ResourceCatalog: FC<ResourceCatalogProps>;
export declare const SiteMenus: FC<SiteMenusProps>;
export declare const TableOfContents: FC<TableOfContentsProps>;
export declare const UniversalMenus: FC<UniversalMenusProps>;
