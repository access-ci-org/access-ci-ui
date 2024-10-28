import { useJSON, useResourceGroupJSON, useTransform } from "./utils";

import Alert from "./alert";
import ResourceGroupEvent from "./resource-group-event";
import Section from "./section";

export default function ResourceGroupEvents({ baseUri, infoGroupId }) {
  const groupData = useResourceGroupJSON(infoGroupId);
  const currentAnnouncementData = useJSON(
    "https://operations-api.access-ci.org/wh2/news/v1/affiliation/access-ci.org/current_outages/",
    null
  );
  const futureAnnouncementData = useJSON(
    "https://operations-api.access-ci.org/wh2/news/v1/affiliation/access-ci.org/future_outages/",
    null
  );
  const eventData = useJSON(
    `https://support.access-ci.org/api/1.1/events/ag/${infoGroupId}`,
    null,
    { corsProxy: true }
  );
  const filteredAnnouncements = useTransform(
    [groupData, currentAnnouncementData, futureAnnouncementData],
    (groups, current, future) =>
      [...current.results, ...future.results].filter((ann) =>
        ann.AffectedResources.some((res) =>
          groups.infoResourceids.includes(res.ResourceID)
        )
      ),
    []
  );
  const filteredEvents = useTransform(
    [eventData],
    (events) =>
      events.filter((event) => new Date(event.date__start) >= new Date()),
    []
  );

  if (!filteredAnnouncements.length && !filteredEvents.length) return;
  return (
    <Section title="Announcements and Events" icon="calendar3">
      {filteredAnnouncements.map(({ Subject: subject, Content: content }) => (
        <Alert>
          {subject}{" "}
          <a href="https://operations.access-ci.org/infrastructure_news_view">
            Learn more.
          </a>
        </Alert>
      ))}
      {filteredEvents.map((event) => ResourceGroupEvent(event))}
    </Section>
  );
}
