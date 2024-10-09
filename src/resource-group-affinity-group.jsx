import { stripTags, useJSON } from "./utils";

import Icon from "./icon";
import Section from "./section";

export default function ResourceGroupAffinityGroup({ baseUri, infoGroupId }) {
  const data = useJSON(
    `https://support.access-ci.org/api/1.0/affinity_groups/${infoGroupId}`,
    null,
    { corsProxy: true }
  );
  if (!data || !data.length) return;
  const slackUri = stripTags(data[0].slack_link);
  return (
    <Section title="Affinity Group" icon="people-fill">
      <p>
        Join the community! Members get update about announcements, events, and
        outages.
      </p>
      <a href="https://support.access-ci.org/user" class="btn secondary">
        <Icon name="person-plus-fill" /> Join Affinity Group
      </a>
      {slackUri ? (
        <a href={slackUri} class="btn">
          <Icon name="slack" /> Connect on Slack
        </a>
      ) : null}
      <a href="#ask-ci-topics" class="btn">
        <Icon name="chat-fill" /> Ask and Answer Questions
      </a>
    </Section>
  );
}
