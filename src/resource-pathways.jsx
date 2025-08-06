import { useRef } from "react";
import Icon from "./icon";

export function ResourcePathways({ setBotOpen }) {
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
      onClick: (e) => {
        e.preventDefault();
        setBotOpen(true);
      },
      description: "You have resource questions. Our Q&A bot has answers!",
      login: true,
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
      <p className="intro">
        ACCESS provides advanced computing resources <strong>at no cost</strong>{" "}
        to researchers and educators.
      </p>
      <ul className="resource-pathways">
        {pathways.map(
          ({ title, icon, href, description, login, onClick }, i) => (
            <li className={`resource-pathway-${i}`} key={title}>
              <a href={href || "#"} onClick={onClick}>
                {icon ? <Icon name={icon} /> : null}{" "}
                <span className="detail">
                  <span className="title">{title}</span>
                  <span className="description">{description}</span>
                  {login ? (
                    <span className="login">
                      <Icon name="key" /> Requires ACCESS Login
                    </span>
                  ) : null}
                </span>
              </a>
            </li>
          ),
        )}
      </ul>
    </section>
  );
}
