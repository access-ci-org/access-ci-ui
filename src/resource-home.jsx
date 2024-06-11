import { Carousel, CarouselSlide } from "./carousel";
import { useJSON } from "./utils";

import { ResourceGroups } from "./resource-groups";

export function ResourceHome({ title, showTitle, slidesURI, groupsURI }) {
  const slides = useJSON(slidesURI, [], "slides");
  const groups = useJSON(groupsURI, null);

  return (
    <>
      {title && <h1 class={showTitle ? "" : "visually-hidden"}>{title}</h1>}
      {slides.length ? (
        <Carousel>{slides.map((slide) => CarouselSlide(slide))}</Carousel>
      ) : null}
      {groups ? <ResourceGroups {...groups} /> : null}
    </>
  );
}
