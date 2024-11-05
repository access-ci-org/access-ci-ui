import Icon from "./icon";

export function ResourcePathways() {
  const pathways = [
    {
      title: "Browse resources",
      icon: "filter-square",
      href: "#browse-resources",
      description: "Filter resources to find the best match for your research.",
    },
    {
      title: "Ask a question",
      icon: "question-circle",
      href: "https://support.access-ci.org/",
      description: "You have resource questions. Our Q&A bot has answers!",
      login: true,
    },
    {
      title: "Get suggestions",
      icon: "card-checklist",
      href: "https://access-ara.ccs.uky.edu:8080/",
      description: "Fill out a form to get resource recommendations.",
    },
  ];
  return (
    <section id="resource-pathways">
      <ul class="resource-pathways">
        {pathways.map(({ title, icon, href, description, login }, i) => (
          <li class={`resource-pathway-${i}`}>
            <a href={href}>
              {icon ? <Icon name={icon} /> : null}
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
        ))}
      </ul>
    </section>
  );
}
