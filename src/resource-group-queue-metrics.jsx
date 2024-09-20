import { useState } from "preact/hooks";
import { useJSON } from "./utils";

import Grid from "./grid";
import InfoTip from "./info-tip";
import Section from "./section";

const formatTime = (value) => {
  const hours = Math.floor(value);
  const minutes = Math.floor((value - hours) * 60);
  const seconds = Math.round((value - hours) * 3600 - minutes * 60);
  return [hours, minutes, seconds]
    .map((value) => value.toString().padStart(2, "0"))
    .join(":");
};

const formatHeaderTip = (content) => (value) => {
  return (
    <>
      <span>{value}</span> <InfoTip tooltip={content} />
    </>
  );
};

export default function ResourceGroupQueueMetrics({ baseUri, infoGroupId }) {
  const [days, setDays] = useState(30);
  const data = useJSON(
    `${baseUri}/api/resource-groups/${infoGroupId}/queue-metrics/${days}.json`,
    null
  );
  if (!data || data.error) return;

  const columns = [
    {
      key: "name",
      name: "Resource",
    },
    {
      key: "waitTime",
      name: "Wait Time",
      format: formatTime,
      formatHeader: formatHeaderTip(
        "Wait time is the average time a job spends waiting in the queue before running on a resource."
      ),
    },
    {
      key: "wallTime",
      name: "Wall Time",
      format: formatTime,
      formatHeader: formatHeaderTip(
        "Wall time is the average time a job spends running on a resource."
      ),
    },
    {
      key: "expansionFactor",
      name: "Expansion Factor",
      format: (_value, row) =>
        ((row.waitTime + row.wallTime) / row.wallTime).toFixed(2),
      formatHeader: formatHeaderTip(
        'Expansion factor is the ratio of the total time (wait time and wall time) to the wall time. It measures how much waiting in the queue "expands" the total time taken to complete a job relative to its length.'
      ),
    },
  ];

  const headerComponents = [
    <select value={days} onChange={(e) => setDays(parseInt(e.target.value))}>
      <option value="30">Last 30 days</option>
      <option value="90">Last 90 days</option>
      <option value="365">Last year</option>
    </select>,
  ];

  return (
    <Section
      title="Queue Metrics"
      icon="clock"
      headerComponents={headerComponents}
    >
      <Grid columns={columns} rows={data.queueMetrics} />
    </Section>
  );
}
