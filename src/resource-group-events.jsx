import { useJSON } from "./utils";

import Alert from "./alert";
import ResourceGroupEvent from "./resource-group-event";
import Section from "./section";

export default function ResourceGroupEvents({ baseUri, resourceGroupId }) {
  const announcementData = useJSON(
    `${baseUri}/api/resource-groups/${resourceGroupId}/announcements.json`,
    null
  );
  const eventData = useJSON(
    `${baseUri}/api/resource-groups/${resourceGroupId}/events.json`,
    null
  );
  if (!announcementData && !eventData) return;
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
      {eventData && eventData.events.map((event) => ResourceGroupEvent(event))}
    </Section>
  );
}
