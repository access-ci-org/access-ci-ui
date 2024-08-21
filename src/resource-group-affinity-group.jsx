import Section from "./section";

export default function ResourceGroupAffinityGroup({
  baseUri,
  resourceGroupId,
}) {
  return (
    <Section title="Affinity Group" icon="people-fill">
      <>
        <p>
          Join the community! Members get update about announcements, events,
          and outages.
        </p>
        <a href="#" class="btn">
          Join
        </a>
        <a href="#" class="btn secondary">
          Slack
        </a>
        <a href="#" class="btn secondary">
          Q&A
        </a>
      </>
    </Section>
  );
}
