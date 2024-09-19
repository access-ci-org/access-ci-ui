import Section from "./section";

export default function ResourceGroupAffinityGroup({ baseUri, infoGroupId }) {
  return (
    <Section title="Affinity Group" icon="people-fill">
      <p>
        Join the community! Members get update about announcements, events, and
        outages.
      </p>
      <a href="#" class="btn secondary">
        Join
      </a>
      <a href="#" class="btn">
        Slack
      </a>
      <a href="#" class="btn">
        Q&A
      </a>
    </Section>
  );
}
