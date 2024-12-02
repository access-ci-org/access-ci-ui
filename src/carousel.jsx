import { useEffect, useRef } from "preact/hooks";
import Glide, { Controls } from "@glidejs/glide/dist/glide.modular.esm";

export default function Carousel({ children, cssClass = "" }) {
  const glide = useRef(null);
  useEffect(() => {
    if (glide.current) new Glide(glide.current).mount({ Controls });
  }, []);
  return (
    <section class={`carousel ${cssClass}`}>
      <div class="glide" ref={glide}>
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">{children}</ul>
        </div>
        <div class="glide__arrows" data-glide-el="controls">
          <button class="glide__arrow glide__arrow--left" data-glide-dir="<">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path d="M0 12l10.975 11 2.848-2.828-6.176-6.176H24v-3.992H7.646l6.176-6.176L10.975 1 0 12z" />
            </svg>
          </button>
          <button class="glide__arrow glide__arrow--right" data-glide-dir=">">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function Slide({ children }) {
  return <li class="glide__slide">{children}</li>;
}

function ImageSlide({
  title,
  description,
  linkText,
  linkURI,
  imageURI,
  imageAltText,
}) {
  return (
    <Slide>
      <span class="slide-inner">
        {imageURI && (
          <a href={linkURI} class="slide-image">
            <img src={imageURI} alt={imageAltText} />
          </a>
        )}
        <span class="slide-text">
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
          {linkText && <a href={linkURI}>{linkText}</a>}
        </span>
      </span>
    </Slide>
  );
}

Carousel.Slide = Slide;
Carousel.ImageSlide = ImageSlide;
