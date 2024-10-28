import { useJSON } from "./utils";

import Alert from "./alert";
import ResourceGroupEvent from "./resource-group-event";
import Section from "./section";

export default function ResourceGroupEvents({ baseUri, infoGroupId }) {
  const announcementData = useJSON(
    `${baseUri}/api/resource-groups/${infoGroupId}/announcements.json`,
    null
  );
  const eventData = useJSON(
    `https://support.access-ci.org/api/1.1/events/ag/${infoGroupId}`,
    null,
    { corsProxy: true }
  );
  const filteredEvents =
    eventData && !eventData.error
      ? eventData.filter((event) => new Date(event.date__start) >= new Date())
      : [];
  if (!announcementData && !filteredEvents.length) return;
  return (
    <Section title="Announcements and Events" icon="calendar3">
      {announcementData &&
        announcementData.announcements.map(
          ({ description, announcementUri }) => (
            <Alert>
              {description}{" "}
              {announcementUri ? (
                <a href={announcementUri}>Learn more.</a>
              ) : null}
            </Alert>
          )
        )}
      {filteredEvents.map((event) => ResourceGroupEvent(event))}
    </Section>
  );
}
