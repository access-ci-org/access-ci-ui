import { useRef } from "preact/hooks";
import Icon from "./icon";

export function ResourcePathways() {
  const container = useRef(null);

  const pathways = [
    {
      title: "Browse resources",
      icon: "filter-square",
      description: "Filter resources to find the best match for your research.",
      onClick: (e) => {
        e.preventDefault();
        if (container.current)
          container.current.nextSibling.scrollIntoView({ bahavior: "smooth" });
      },
    },
    {
      title: "Ask a question",
      icon: "question-circle",
      href: "https://support.access-ci.org/",
      description: "You have resource questions. Our Q&A bot has answers!",
      login: true,
      onClick: (e) => {
        e.preventDefault();
        const button = document.querySelector('.rcb-button-show');
        if (button instanceof HTMLElement) {
          button.click();
        }
      }
    },
    {
      title: "Get suggestions",
      icon: "card-checklist",
      href: "https://access-ara.ccs.uky.edu:8080/",
      description: "Fill out a form to get resource recommendations.",
    },
    {
      title: "Read news",
      icon: "newspaper",
      href: "https://access-ci.org/tag/resource-providers/",
      description: "See the latest news from resource providers.",
    },
  ];
  return (
    <section id="resource-pathways" ref={container}>
      <p class="intro">
        ACCESS provides advanced computing resources <strong>at no cost</strong>{" "}
        to researchers and educators.
      </p>
      <ul class="resource-pathways">
        {pathways.map(
          ({ title, icon, href, description, login, onClick }, i) => (
            <li class={`resource-pathway-${i}`}>
              <a href={href || "#"} onClick={onClick}>
                {icon ? <Icon name={icon} /> : null}{" "}
                <span class="detail">
                  <span class="title">{title}</span>
                  <span class="description">{description}</span>
                  {login ? (
                    <span class="login">
                      <Icon name="key" /> Requires ACCESS Login
                    </span>
                  ) : null}
                </span>
              </a>
            </li>
          )
        )}
      </ul>
    </section>
  );
}
