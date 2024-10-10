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
- `tableOfContents`: Page table of contents
- `footerMenus`: Site-specific navigation menus above the footer
- `footer`: Universal footer

## Example

### ES6
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
<script type="module">
  import {
    footer,
    footerMenus,
    header,
    siteMenus,
    tableOfContents,
    universalMenuItems,
    universalMenus,
  } from "https://esm.sh/@access-ci/ui@0.2.5";

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
    target: document.getElementById("footer-menus"),
  });

  footer({ target: document.getElementById("footer") });
</script>
```

### Plain Javascript

The components will be created for those defined in window.ACCESS_CI_UI_CONFIG. As long as each component 
has at least {} or true as its value, the components will be generated successfully.

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
<script>

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

  window.ACCESS_CI_UI_CONFIG = {
      universalMenus: {
        loginUrl: "/login",
        logoutUrl: "/logout",
        siteName: "Allocations",
        targetId: "universal-menus"
      },
      header: {
        siteName: "Allocations",
        targetId: "header"
      },
      siteMenus: {
        items: siteItems,
        siteName: "Allocations",
        targetId: "site-menus"
      },
      tableOfContents: {
        headings: document.querySelectorAll("#body h1, #body h2"),
        targetId: "table-of-contents",
      },
      footerMenus: {
        items: siteItems,
        targetId: "footer-menus"
      },
      footer: {
        targetId: "footer"
      }
    }
</script>
<script src="https://cdn.jsdelivr.net/gh/access-ci-org/access-ci-ui@<version>/dist/access-ci-ui.esbuild.js"></script>
```
