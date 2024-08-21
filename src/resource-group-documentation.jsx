import { useJSON } from "./utils";

import Section from "./section";

export default function ResourceGroupDocumentation({
  baseUri,
  resourceGroupId,
}) {
  const data = useJSON(
    `${baseUri}/api/resource-groups/${resourceGroupId}/documentation.json`,
    null
  );

  if (!data || data.error) return;

  return (
    <Section title="Documentation" icon="book">
      <ul>
        {data.documentation.map(({ name, documentationUri }) => (
          <li>
            <a href={documentationUri}>{name}</a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
