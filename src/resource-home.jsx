import { useEffect, useState } from "preact/hooks";
import { Carousel, CarouselSlide } from "./carousel";

export function ResourceHome({ title, showTitle, slidesURI }) {
  const [slides, setSlides] = useState([]);
  useEffect(() => {
    if (slidesURI)
      (async () => {
        const res = await fetch(slidesURI);
        setSlides((await res.json()).slides);
      })();
  }, []);

  return (
    <>
      {title && <h1 class={showTitle ? "" : "visually-hidden"}>{title}</h1>}
      {slides.length ? (
        <Carousel>{slides.map((slide) => CarouselSlide(slide))}</Carousel>
      ) : null}
    </>
  );
}
