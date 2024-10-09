import { useJSON } from "./utils";

import Alert from "./alert";
import ResourceGroupEvent from "./resource-group-event";
import Section from "./section";

export default function ResourceGroupEvents({ baseUri, infoGroupId }) {
  const announcementData = useJSON(
    `${baseUri}/api/resource-groups/${infoGroupId}/announcements.json`,
    null
  );
  // FIXME: Once events can be looked up by info_groupid, the request to get
  // affinity group data can be removed.
  const affinityGroupData = useJSON(
    `https://support.access-ci.org/api/1.0/affinity_groups/${infoGroupId}`,
    null,
    { corsProxy: true }
  );
  const eventUri =
    affinityGroupData && !affinityGroupData.error && affinityGroupData.length
      ? `https://support.access-ci.org/api/1.0/events/ag/${affinityGroupData[0].nid}`
      : null;
  const eventData = useJSON(eventUri, null, { corsProxy: true });
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
      {eventData && eventData.map((event) => ResourceGroupEvent(event))}
    </Section>
  );
}
