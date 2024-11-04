import { extractHref, stripTags, useJSON } from "./utils";

import InfoTip from "./info-tip";
import Section from "./section";

export default function ResourceGroupDocumentation({ baseUri, infoGroupId }) {
  const data = useJSON(
    `https://md-2261-accessmatch.pantheonsite.io/api/1.0/kb/${infoGroupId}`
  );

  if (!data || data.error || !data.length) return;

  return (
    <Section title="Documentation" icon="book">
      <ul>
        {data.map(({ title, description, link }) => (
          <li>
            <a href={extractHref(link)}>{title}</a>
            {description ? <InfoTip tooltip={stripTags(description)} /> : null}
          </li>
        ))}
      </ul>
    </Section>
  );
}
