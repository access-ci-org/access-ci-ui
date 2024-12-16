import { ErrorBoundary, lazy, LocationProvider, Router } from "preact-iso";
import resourceCatalogStyle from "./resource-catalog.css?inline";

const ResourceGroupDetail = lazy(() => import("./resource-group-detail.jsx"));
const ResourceHome = lazy(() => import("./resource-home.jsx"));

export function ResourceCatalog({
  title = "Resources",
  showTitle = true,
  baseUri = "/resources",
}) {
  return (
    <>
      <LocationProvider>
        <ErrorBoundary>
          <Router>
            <ResourceHome
              path={baseUri}
              baseUri={baseUri}
              title={title}
              showTitle={showTitle}
            />
            <ResourceGroupDetail
              path={`${baseUri}/:infoGroupId`}
              baseUri={baseUri}
            />
          </Router>
        </ErrorBoundary>
      </LocationProvider>
      <style>{resourceCatalogStyle}</style>
    </>
  );
}
