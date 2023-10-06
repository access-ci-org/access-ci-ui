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

## Menus

The library includes functions for rendering the ACCESS universal navigation menus,
site menus, and footer menus:

```html
<div id="universal-menus"></div>
...
<div id="site-menus"></div>
...
<div id="footer-menus"></div>
<script type="module">
  import {
    footerMenus,
    universalMenuItems,
    universalMenus,
    siteMenus,
  } from "/src/index.js";

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
    target: document.getElementById("universal-menus"),
  });

  siteMenus({
    items: siteItems,
    siteName: "Allocations",
    target: document.getElementById("site-menus"),
  });

  footerMenus({
    items: siteItems,
    target: document.getElementById("footer-menus"),
  });
</script>
```
