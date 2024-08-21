import { ErrorBoundary, lazy, LocationProvider, Router } from "preact-iso";
import accordionStyle from "./accordion.css?inline";
import alertStyle from "./alert.css?inline";
import baseStyle from "./base.css?inline";
import componentsStyle from "./components.css?inline";
import contentStyle from "./content.css?inline";
import iconStyle from "./icon.css?inline";
import infoTipStyle from "./info-tip.css?inline";
import glideCoreStyle from "@glidejs/glide/dist/css/glide.core.min.css?inline";
import glideThemeStyle from "@glidejs/glide/dist/css/glide.theme.min.css?inline";
import gridStyle from "./grid.css?inline";
import carouselStyle from "./carousel.css?inline";
import resourceFiltersStyle from "./resource-filters.css?inline";
import resourceGroupStyle from "./resource-group.css?inline";
import resourceGroupEventStyle from "./resource-group-event.css?inline";
import searchStyle from "./search.css?inline";
import sectionNavigationStyle from "./section-navigation.css?inline";
import tagsStyle from "./tags.css?inline";
import tippyStyle from "tippy.js/dist/tippy.css?inline";

const ResourceGroupDetail = lazy(() => import("./resource-group-detail.jsx"));
const ResourceHome = lazy(() => import("./resource-home.jsx"));

export function ResourceCatalog({
  title = "Resource Catalog",
  showTitle = false,
  baseUri = "/access-ci-ui",
  groupsURI = "/api/resource-groups.json",
  slidesURI = "/api/resource-slides.json",
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
              path={`${baseUri}/resources/:resourceGroupId`}
            />
          </Router>
        </ErrorBoundary>
      </LocationProvider>
      <style>{baseStyle}</style>
      <style>{contentStyle}</style>
      <style>{componentsStyle}</style>
      <style>{accordionStyle}</style>
      <style>{alertStyle}</style>
      <style>{iconStyle}</style>
      <style>{infoTipStyle}</style>
      <style>{glideCoreStyle}</style>
      <style>{glideThemeStyle}</style>
      <style>{gridStyle}</style>
      <style>{carouselStyle}</style>
      <style>{resourceFiltersStyle}</style>
      <style>{resourceGroupStyle}</style>
      <style>{resourceGroupEventStyle}</style>
      <style>{searchStyle}</style>
      <style>{sectionNavigationStyle}</style>
      <style>{tagsStyle}</style>
      <style>{tippyStyle}</style>
    </>
  );
}
