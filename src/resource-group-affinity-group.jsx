import { stripTags, useJSON } from "./utils";

import Icon from "./icon";
import Section from "./section";

export default function ResourceGroupAffinityGroup({ infoGroupId }) {
  const data = useJSON(
    `https://support.access-ci.org/api/1.0/affinity_groups/${infoGroupId}`
  );
  if (!data || data.error || !data.length) return;
  const slackUri = stripTags(data[0].slack_link);
  return (
    <Section title="User Community" icon="people-fill">
      <p>
        Join the community by participating in an affinity group! Members get
        update about announcements, events, and outages.
      </p>
      <div class="button-group">
        <a href={data[0].url} class="btn secondary">
          <Icon name="person-plus-fill" /> Join Affinity Group
        </a>
        {slackUri ? (
          <a href={slackUri} class="btn">
            <Icon name="slack" /> Connect on Slack
          </a>
        ) : null}
        <a href="#questions-and-answers" class="btn">
          <Icon name="chat-fill" /> Ask and Answer Questions
        </a>
      </div>
    </Section>
  );
}
