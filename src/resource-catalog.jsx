import Router from "preact-router";

import baseStyle from "./base.css?inline";
import contentStyle from "./content.css?inline";
import glideCoreStyle from "@glidejs/glide/dist/css/glide.core.min.css?inline";
import glideThemeStyle from "@glidejs/glide/dist/css/glide.theme.min.css?inline";
import carouselStyle from "./carousel.css?inline";
import resourceGroupsStyle from "./resource-groups.css?inline";
import tagsStyle from "./tags.css?inline";

import { ResourceHome } from "./resource-home";

export function ResourceCatalog({
  title = "Resource Catalog",
  showTitle = false,
  groupsURI = "/api/resourceGroups.json",
  slidesURI = "/api/resourceSlides.json",
}) {
  return (
    <>
      <Router>
        <ResourceHome
          path="/"
          title={title}
          showTitle={showTitle}
          slidesURI={slidesURI}
          groupsURI={groupsURI}
        />
      </Router>
      <style>{baseStyle}</style>
      <style>{contentStyle}</style>
      <style>{glideCoreStyle}</style>
      <style>{glideThemeStyle}</style>
      <style>{carouselStyle}</style>
      <style>{resourceGroupsStyle}</style>
      <style>{tagsStyle}</style>
    </>
  );
}
