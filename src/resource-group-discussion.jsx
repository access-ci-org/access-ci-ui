import { useJSON } from "./utils";

import Grid from "./grid";
import Icon from "./icon";
import Section from "./section";

const getCategoryUri = (category, siteData) => {
  if (!category) return null;
  let uri = `${category.slug}/${category.id}.json`;
  let currentCategory = category;
  while (currentCategory.parent_category_id) {
    currentCategory = siteData.categories.find(
      (cat) => cat.id == currentCategory.parent_category_id
    );
    uri = `${currentCategory.slug}/${uri}`;
  }
  return `https://ask.cyberinfrastructure.org/c/${uri}`;
};

export default function ResourceGroupDiscussion({ infoGroupId }) {
  const siteData = useJSON(`https://ask.cyberinfrastructure.org/site.json`, {
    corsProxy: true,
  });
  // Try to find a category with a slug that matches the info group ID.
  // TODO: Replace this with better logic once the CID and slug are available
  // in the Support APIs.
  const slugNeedle = infoGroupId.split(".")[0].replace(/[^a-z]/g, "");
  const category =
    !siteData || siteData.error
      ? null
      : siteData.categories.find((cat) =>
          cat.slug.split("-").includes(slugNeedle)
        );

  const categoryDataUri = getCategoryUri(category, siteData);
  const categoryData = useJSON(categoryDataUri, {
    corsProxy: true,
  });

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

  const categoryWebUri = categoryDataUri.replace(/\.json$/, "");
  const headerComponents = [
    <a href={categoryWebUri} class="btn secondary">
      Ask a Question
    </a>,
    <a href={categoryWebUri} class="btn">
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
