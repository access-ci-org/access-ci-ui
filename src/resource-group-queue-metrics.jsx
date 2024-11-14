import { useState } from "preact/hooks";
import { useJSON, useResourceGroup } from "./utils";

import Section from "./section";

const pluralize = (count, label, places = 0) =>
  `${count.toFixed(places)} ${label}${count == 1 ? "" : "s"}`;

const formatTime = (seconds) => {
  const hours = seconds / 3600;
  if (hours >= 1) return pluralize(hours, "hour", 1);
  const minutes = seconds / 60;
  if (minutes >= 1) return pluralize(minutes, "minute", 0);
  return pluralize(seconds, "second", 0);
};

export default function ResourceGroupQueueMetrics({ infoGroupId }) {
  const [view, setView] = useState("overview");
  const resourceGroup = useResourceGroup(infoGroupId);
  const resources = useJSON(
    resourceGroup
      ? resourceGroup.infoResourceIds.map(
          (infoResourceId) =>
            `https://operations-api.access-ci.org/wh2/cider/v1/info_resourceid/${infoResourceId}/?format=json`
        )
      : null,
    { defaultValue: [] }
  );
  const overviewMetrics = useJSON(
    resourceGroup
      ? resourceGroup.infoResourceIds.map(
          (infoResourceId) =>
            `https://rest-test.ccr.xdmod.org/rest/v0.1/custom_queries/wait_times/${infoResourceId}/`
        )
      : null,
    { defaultValue: [] }
  );

  if (!overviewMetrics.length || !resources.length) return;

  const overview = overviewMetrics
    .map((om, i) =>
      om.error ? om : { ...om.data[0], ...resources[i].results }
    )
    .filter((data) => !data.error);

  if (!overview.length) return;

  return (
    <Section title="Queue Metrics" icon="clock">
      {overview.map(
        ({
          job_count,
          median_expansion_factor,
          median_wait_time,
          median_wall_time,
          resource_descriptive_name,
        }) => {
          return (
            <p>
              <strong>
                {resource_descriptive_name.replace(/ \([^)]+\)/, "")}:
              </strong>{" "}
              Users ran{" "}
              <strong>{parseInt(job_count).toLocaleString("en-us")}</strong>{" "}
              jobs during the last 30 days. Waiting in the queue increased the
              time to complete these jobs by{" "}
              <strong>
                {((median_expansion_factor - 1) * 100).toLocaleString("en-us", {
                  maximumFractionDigits: 0,
                })}
                %
              </strong>{" "}
              on average. The median job waited for{" "}
              <strong>{formatTime(median_wait_time)}</strong> and ran for{" "}
              <strong>{formatTime(median_wall_time)}</strong>.
            </p>
          );
        }
      )}
    </Section>
  );
}
