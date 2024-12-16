import { useJSON } from "./utils";

export function ResourceNews({ maxItems = 2 }) {
  const newsItems = useJSON("https://support.access-ci.org/access_news/api", {
    defaultValue: [],
  });

  if (!newsItems || newsItems.error || !newsItems.length) return;

  return (
    <section id="resource-news">
      <h2>Resource News</h2>
      <ul class="resource-news">
        {newsItems.slice(0, maxItems).map(({ title, linkUrl }) => (
          <li>
            <a href={linkUrl} class="news-link">
              {title.replace("&amp;", "&").replace("&nbsp;", " ")}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
