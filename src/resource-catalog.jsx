import { ErrorBoundary, lazy, LocationProvider, Router } from "preact-iso";
import accordionStyle from "./accordion.css?inline";
import alertStyle from "./alert.css?inline";
import baseStyle from "./base.css?inline";
import componentsStyle from "./components.css?inline";
import contentStyle from "./content.css?inline";
import donutChartStyle from "./donut-chart.css?inline";
import expandTextStyle from "./expand-text.css?inline";
import iconStyle from "./icon.css?inline";
import infoTipStyle from "./info-tip.css?inline";
import glideCoreStyle from "@glidejs/glide/dist/css/glide.core.min.css?inline";
import glideThemeStyle from "@glidejs/glide/dist/css/glide.theme.min.css?inline";
import gridStyle from "./grid.css?inline";
import carouselStyle from "./carousel.css?inline";
import miniBarStyle from "./mini-bar.css?inline";
import resourceFiltersStyle from "./resource-filters.css?inline";
import resourceGroupStyle from "./resource-group.css?inline";
import resourceGroupEventStyle from "./resource-group-event.css?inline";
import resourceGroupProjectsStyle from "./resource-group-projects.css?inline";
import resourceGroupQueueMetricsStyle from "./resource-group-queue-metrics.css?inline";
import resourceHomeStyle from "./resource-home.css?inline";
import resourceNewsStyle from "./resource-news.css?inline";
import resourcePathwaysStyle from "./resource-pathways.css?inline";
import searchStyle from "./search.css?inline";
import sectionNavigationStyle from "./section-navigation.css?inline";
import tagsStyle from "./tags.css?inline";
import tippyStyle from "tippy.js/dist/tippy.css?inline";

const ResourceGroupDetail = lazy(() => import("./resource-group-detail.jsx"));
const ResourceHome = lazy(() => import("./resource-home.jsx"));

export function ResourceCatalog({
  title = "Resources",
  showTitle = true,
  baseUri = "/access-ci-ui",
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
            <ResourceGroupDetail path={`${baseUri}/resources/:infoGroupId`} />
          </Router>
        </ErrorBoundary>
      </LocationProvider>
      <style>{baseStyle}</style>
      <style>{contentStyle}</style>
      <style>{componentsStyle}</style>
      <style>{accordionStyle}</style>
      <style>{alertStyle}</style>
      <style>{donutChartStyle}</style>
      <style>{expandTextStyle}</style>
      <style>{iconStyle}</style>
      <style>{infoTipStyle}</style>
      <style>{glideCoreStyle}</style>
      <style>{glideThemeStyle}</style>
      <style>{gridStyle}</style>
      <style>{carouselStyle}</style>
      <style>{miniBarStyle}</style>
      <style>{resourceFiltersStyle}</style>
      <style>{resourceGroupStyle}</style>
      <style>{resourceGroupEventStyle}</style>
      <style>{resourceGroupProjectsStyle}</style>
      <style>{resourceGroupQueueMetricsStyle}</style>
      <style>{resourceHomeStyle}</style>
      <style>{resourceNewsStyle}</style>
      <style>{resourcePathwaysStyle}</style>
      <style>{searchStyle}</style>
      <style>{sectionNavigationStyle}</style>
      <style>{tagsStyle}</style>
      <style>{tippyStyle}</style>
    </>
  );
}
