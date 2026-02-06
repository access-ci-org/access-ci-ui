# ACCESS CI User Interface Components

This library provides user interface components for [ACCESS CI](https://access-ci.org/)
websites. The components are rendered using the shadow DOM so that their styles are
isolated from the rest of the site.

## Prerequisites

Sites using ACCESS user interface components should include the Archivo font family:

```html
<link
  rel="stylesheet"
  id="google-font-archivo-css"
  href="https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,70,400;0,100,400;0,100,500;0,100,600;0,100,700;0,100,800;1,100,400&amp;display=swap"
  media="all"
/>
```

## Components

The library includes functions for rendering common ACCESS user interface components:

- `universalMenus`: Universal navigation menus
- `header`: Logo header
- `siteMenus`: Site-specific navigation menus
- `breadcrumbs`: Breadcrumb navigation
- `tableOfContents`: Page table of contents
- `footerMenus`: Site-specific navigation menus above the footer
- `footer`: Universal footer
- `resourceCatalog`: ACCESS resource catalog
- `qaBot`: Question/answer bot

## Example

```html
<div id="universal-menus"></div>
<div id="header"></div>
<div id="site-menus"></div>
<div id="main" class="container">
  <div id="body">
    <h1>Page Title</h1>
    <h2>First Section</h2>
    <h2>Second Section</h2>
    <h2>Third Section</h2>
  </div>
  <div id="table-of-contents"></div>
</div>
<div id="footer-menus"></div>
<div id="footer"></div>
<div id="qa-bot"></div>
<script type="module">
  import {
    footer,
    footerMenus,
    header,
    qaBot,
    siteMenus,
    tableOfContents,
    universalMenuItems,
    universalMenus,
  } from "https://unpkg.com/@access-ci/ui@0.17.0/dist/access-ci-ui.js";

  const siteItems = [
    {
      name: "One",
      items: [
        {
          name: "Item A",
          href: "/one/a",
        },
        {
          name: "Item B",
          href: "/one/b",
        },
        {
          name: "Item C",
          href: "/one/c",
        },
      ],
    },
    {
      name: "Two",
      items: [
        {
          name: "Item A",
          href: "/two/a",
        },
        {
          name: "Item B",
          href: "/two/b",
        },
      ],
    },
    {
      name: "Three",
      href: "/three",
    },
  ];

  universalMenus({
    loginUrl: "/login",
    logoutUrl: "/logout",
    siteName: "Allocations",
    target: document.getElementById("universal-menus"),
  });

  header({
    siteName: "Allocations",
    target: document.getElementById("header"),
  });

  siteMenus({
    items: siteItems,
    siteName: "Allocations",
    target: document.getElementById("site-menus"),
  });

  tableOfContents({
    headings: document.querySelectorAll("#body h1, #body h2"),
    target: document.getElementById("table-of-contents"),
  });

  footerMenus({
    items: siteItems,
    siteName: "Allocations",
    target: document.getElementById("footer-menus"),
  });

  footer({ target: document.getElementById("footer") });

  qaBot({
    target: document.getElementById("qa-bot"),
    apiKey: "my-api-key",
    userEmail: "user@example.com",
    userName: "John Doe",
    accessId: "jdoe123",
    isLoggedIn: true,
    welcome: "Welcome to the ACCESS Q&A Bot!",
    onAnalyticsEvent: (event) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(event);
    },
  });
</script>
```
