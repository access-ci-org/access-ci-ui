import Icon from "./icon";

export default function ResourceGroupEvent({
  title,
  startDateTime,
  endDateTime,
  eventUri,
  speaker,
  description,
}) {
  const headingContent = eventUri ? <a href={eventUri}>{title}</a> : title;
  const metadata = [];
  let icon = null;

  if (startDateTime) {
    const start = new Date(startDateTime);
    const end = new Date(endDateTime || startDateTime);
    const [startDate, endDate] = [start, end].map((date) =>
      date.toLocaleString("en-US", { dateStyle: "long" })
    );
    const [startTime, endTime] = [start, end].map((date) =>
      date.toLocaleString("en-US", { timeStyle: "short" })
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

    const iconContent = start
      .toLocaleString("en-US", { dateStyle: "medium" })
      .split(",")[0]
      .split(" ")
      .map((part) => <span>{part}</span>);
    icon = eventUri ? (
      <a href={eventUri} class="event-icon">
        {iconContent}
      </a>
    ) : (
      <div class="event-icon">{iconContent}</div>
    );
  }

  if (speaker) metadata.push(<Icon name="people-fill" />, speaker);

  return (
    <div class="event">
      {icon}
      <div class="event-details">
        <h3>{headingContent}</h3>
        {metadata.length ? <div class="event-metadata">{metadata}</div> : null}
        {description ? <p>{description}</p> : null}
      </div>
    </div>
  );
}
