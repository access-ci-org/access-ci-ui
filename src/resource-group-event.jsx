import { htmlToJsx } from "./utils";

import ExpandText from "./expand-text";
import Icon from "./icon";

export default function ResourceGroupEvent({
  date__end,
  date__start,
  description,
  location,
  registration,
  speaker,
  title,
}) {
  const eventUri = registration;
  const headingContent = eventUri ? <a href={eventUri}>{title}</a> : title;
  const metadata = [];
  let icon = null;

  // Start and end time
  const startDateTime = date__start;
  const endDateTime = date__end;
  if (startDateTime) {
    const start = new Date(startDateTime);
    const end = new Date(endDateTime || startDateTime);
    const [startDate, endDate] = [start, end].map((date) =>
      date.toLocaleString("en-US", { dateStyle: "long" }),
    );
    const [startTime, endTime] = [start, end].map((date) =>
      date.toLocaleString("en-US", { timeStyle: "short" }),
    );
    const tz = start
      .toLocaleTimeString("en-US", { timeZoneName: "short" })
      .split(" ")[2];
    const parts = [`${startDate},`, startTime];
    if (endTime != startTime || endDate != startDate) {
      parts.push("-");
      if (endDate != startDate) parts.push(`${endDate},`);
      parts.push(endTime);
    }
    parts.push(`(${tz})`);
    metadata.push(<Icon name="calendar" />, parts.join(" "));

    // Speaker
    if (speaker) metadata.push(<Icon name="people-fill" />, speaker);

    // Event location
    if (location) metadata.push(<Icon name="geo-alt-fill" />, location);

    const iconContent = start
      .toLocaleString("en-US", { dateStyle: "medium" })
      .split(",")[0]
      .split(" ")
      .map((part) => <span key={part}>{part}</span>);
    icon = eventUri ? (
      <a href={eventUri} className="event-icon">
        {iconContent}
      </a>
    ) : (
      <div className="event-icon">{iconContent}</div>
    );
  }

  return (
    <div className="event">
      {icon}
      <div className="event-details">
        <h3>{headingContent}</h3>
        {metadata.length ? (
          <div className="event-metadata">{metadata}</div>
        ) : null}
        {description ? (
          <ExpandText>
            <div>{htmlToJsx(description)}</div>
          </ExpandText>
        ) : null}
      </div>
    </div>
  );
}
