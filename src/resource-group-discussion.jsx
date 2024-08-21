import { useJSON } from "./utils";

import Grid from "./grid";
import Section from "./section";

export default function ResourceGroupDiscussion({ baseUri, resourceGroupId }) {
  const data = useJSON(
    `${baseUri}/api/resource-groups/${resourceGroupId}/discussion.json`,
    null
  );

  if (!data || data.error) return;

  const columns = [
    {
      key: "topic",
      name: "Topic",
      format: (value, row) => <a href={row.topicUri}>{value}</a>,
    },
    {
      key: "updateDate",
      name: "Last Update",
      format: (value) =>
        new Date(value).toLocaleString("en-US", { dateStyle: "medium" }),
    },
  ];

  const headerComponents = [
    <a href={data.categoryUri} class="btn secondary">
      Ask a Question
    </a>,
    <a href={data.categoryUri} class="btn">
      View All Topics
    </a>,
  ];

  return (
    <Section
      title="Ask.CI Topics"
      icon="chat-fill"
      headerComponents={headerComponents}
    >
      <Grid columns={columns} rows={data.topics} />
    </Section>
  );
}
