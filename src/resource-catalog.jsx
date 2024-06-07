import baseStyle from "./base.css?inline";
import contentStyle from "./content.css?inline";
import glideCoreStyle from "@glidejs/glide/dist/css/glide.core.min.css?inline";
import glideThemeStyle from "@glidejs/glide/dist/css/glide.theme.min.css?inline";
import carouselStyle from "./carousel.css?inline";

import { ResourceHome } from "./resource-home";

export function ResourceCatalog({
  title = "Resource Catalog",
  showTitle = false,
  slidesURI = "/api/resourceCatalogSlides.json",
}) {
  return (
    <>
      <ResourceHome title={title} showTitle={showTitle} slidesURI={slidesURI} />
      <style>{baseStyle}</style>
      <style>{contentStyle}</style>
      <style>{glideCoreStyle}</style>
      <style>{glideThemeStyle}</style>
      <style>{carouselStyle}</style>
    </>
  );
}
