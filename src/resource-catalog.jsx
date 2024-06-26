import { ErrorBoundary, lazy, LocationProvider, Router } from "preact-iso";
import baseStyle from "./base.css?inline";
import contentStyle from "./content.css?inline";
import iconStyle from "./icon.css?inline";
import glideCoreStyle from "@glidejs/glide/dist/css/glide.core.min.css?inline";
import glideThemeStyle from "@glidejs/glide/dist/css/glide.theme.min.css?inline";
import carouselStyle from "./carousel.css?inline";
import resourceFiltersStyle from "./resource-filters.css?inline";
import resourceGroupStyle from "./resource-group.css?inline";
import tagsStyle from "./tags.css?inline";

const ResourceGroupDetail = lazy(() => import("./resource-group-detail.jsx"));
const ResourceHome = lazy(() => import("./resource-home.jsx"));

export function ResourceCatalog({
  title = "Resource Catalog",
  showTitle = false,
  baseUri = "/access-ci-ui",
  groupsURI = "/api/resourceGroups.json",
  slidesURI = "/api/resourceSlides.json",
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
              slidesURI={slidesURI}
              groupsURI={groupsURI}
            />
            <ResourceGroupDetail
              baseUri={baseUri}
              path={`${baseUri}/resources/:resourceId`}
            />
          </Router>
        </ErrorBoundary>
      </LocationProvider>
      <style>{baseStyle}</style>
      <style>{contentStyle}</style>
      <style>{iconStyle}</style>
      <style>{glideCoreStyle}</style>
      <style>{glideThemeStyle}</style>
      <style>{carouselStyle}</style>
      <style>{resourceFiltersStyle}</style>
      <style>{resourceGroupStyle}</style>
      <style>{tagsStyle}</style>
    </>
  );
}
