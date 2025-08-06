import { useJSON } from "./utils";

import Grid from "./grid";
import Icon from "./icon";
import Section from "./section";

export default function ResourceGroupDiscussion({ infoGroupId }) {
  const data = useJSON(
    `https://support.access-ci.org/api/1.0/affinity_groups/${infoGroupId}`,
  );

  const categoryWebUri =
    data && !data.error && data.length ? data[0].field_ask_ci_locale : null;
  const categoryDataUri = categoryWebUri ? `${categoryWebUri}.json` : null;
  const categoryData = useJSON(categoryDataUri);

  if (
    !categoryData ||
    categoryData.error ||
    !categoryData.topic_list ||
    !categoryData.topic_list.topics ||
    !categoryData.topic_list.topics.length
  )
    return;

  const columns = [
    {
      key: "title",
      name: "Topic",
      format: (value, row) => (
        <>
          {row.pinned ? <Icon name="pin-fill" /> : null}
          <a
            href={`https://ask.cyberinfrastructure.org/t/${row.slug}/${row.id}`}
          >
            {value}
          </a>
        </>
      ),
    },
    {
      key: "posts_count",
      name: "Posts",
      format: (value) => value.toLocaleString("en-us"),
    },
    {
      key: "bumped_at",
      name: "Last Update",
      format: (value) =>
        new Date(value).toLocaleString("en-US", { dateStyle: "medium" }),
    },
  ];

  const headerComponents = [
    <a key="ask" href={categoryWebUri} className="btn secondary">
      Ask a Question
    </a>,
    <a key="all" href={categoryWebUri} className="btn">
      View All Topics
    </a>,
  ];

  return (
    <Section
      title="Questions and Answers"
      icon="chat-fill"
      headerComponents={headerComponents}
    >
      <Grid
        columns={columns}
        rows={categoryData.topic_list.topics.slice(0, 5)}
      />
    </Section>
  );
}
