import { createElement, Fragment } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { createRoot } from "preact/compat/client";
import { autocomplete } from "@algolia/autocomplete-js";
import { useResourceGroups } from "./utils";

import "@algolia/autocomplete-theme-classic";

export function ResourceSearch({}) {
  const containerRef = useRef(null);
  const panelRootRef = useRef(null);
  const rootRef = useRef(null);
  const groups = useResourceGroups();

  console.log(groups);

  const resourceGroups = groups ? groups.resourceGroups : [];
  const tags = groups ? groups.tags : [];

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      placeholder:
        "Find resources by name, organization, feature, or software...",
      insights: true,
      getSources() {
        return [
          {
            sourceId: "resource-groups",
            getItems({ query }) {
              return resourceGroups;
            },
            getItemUrl({ item }) {
              return null;
            },
            templates: {
              item({ item }) {
                return <>{item.name}</>;
              },
            },
          },
        ];
        // return [
        //   {
        //     sourceId: 'products',
        //     getItems() {
        //       return getAlgoliaResults<ProductHit>({
        //         searchClient,
        //         queries: [
        //           {
        //             indexName: 'instant_search',
        //             query,
        //           },
        //         ],
        //       });
        //     },
        //     templates: {
        //       item({ item, components }) {
        //         return <ProductItem hit={item} components={components} />;
        //       },
        //       noResults() {
        //         return 'No products matching.';
        //       },
        //     },
        //   },
        // ];
      },
      renderer: { createElement, Fragment, render: () => {} },
      render({ children }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;

          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }

        panelRootRef.current.render(children);
      },
    });

    return () => {
      search.destroy();
    };
  }, []);

  return <div ref={containerRef} />;
}
