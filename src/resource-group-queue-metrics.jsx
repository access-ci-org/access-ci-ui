import { useState } from "preact/hooks";
import { useJSON, useResourceGroupResources } from "./utils";

import Section from "./section";
import Chart from "./chart";

const colorVars = [
  "--teal-700",
  "--yellow-400",
  "--teal-400",
  "--orange-400",
  "--green-400",
  "--red-400",
];

const wallTimes = [
  "0 - 1s",
  "1 - 30s",
  "30s - 30min",
  "30 - 60min",
  "1 - 5hr",
  "5 - 10hr",
  "10 - 18hr",
  "18+hr",
];

const pluralize = (count, label, places = 0) =>
  `${count.toFixed(places)} ${label}${count == 1 ? "" : "s"}`;

const formatTime = (seconds) => {
  const hours = seconds / 3600;
  if (hours >= 1) return pluralize(hours, "hour", 1);
  const minutes = seconds / 60;
  if (minutes >= 1) return pluralize(minutes, "minute", 0);
  return pluralize(seconds, "second", 0);
};

const formatName = (name) => name.replace(/ \([^)]+\)/, "");

export default function ResourceGroupQueueMetrics({ infoGroupId }) {
  const [view, setView] = useState("overview");
  const resources = useResourceGroupResources(infoGroupId).filter(
    (res) => res.cider_type == "Compute"
  );

  const overviewMetrics = useJSON(
    resources.length
      ? resources.map(
          (res) =>
            `https://rest-test.ccr.xdmod.org/rest/v0.1/custom_queries/wait_times/${res.info_resourceid}/`
        )
      : null,
    { defaultValue: [] }
  );

  const detailMetrics = useJSON(
    view !== "overview"
      ? `https://rest-test.ccr.xdmod.org/rest/v0.1/custom_queries/wait_times/${view}/queue/job_walltime`
      : null
  );

  if (!overviewMetrics.length || !resources.length) return;

  const overview = overviewMetrics
    .map((om, i) => (om.error ? om : { ...om.data[0], ...resources[i] }))
    .filter((data) => !data.error);

  if (!overview.length) return;

  const headerComponents = [
    <select value={view} onChange={(e) => setView(e.target.value)}>
      <option value="overview">Overview</option>
      {overview.map((res) => (
        <option value={res.info_resourceid}>
          {formatName(res.resource_descriptive_name)}
        </option>
      ))}
    </select>,
  ];

  let content = null;
  if (view === "overview") {
    content = overview.map(
      ({
        job_count,
        median_expansion_factor,
        median_wait_time,
        median_wall_time,
        resource_descriptive_name,
      }) => {
        return (
          <p>
            <strong>{formatName(resource_descriptive_name)}:</strong> Users ran{" "}
            <strong>{parseInt(job_count).toLocaleString("en-us")}</strong> jobs
            during the last 30 days. Waiting in the queue increased the time to
            complete these jobs by{" "}
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
    );
  } else if (detailMetrics && detailMetrics.info_resource_id === view) {
    const datasetsMap = {};
    const labels = wallTimes;
    for (let item of detailMetrics.data) {
      datasetsMap[item.queue] = datasetsMap[item.queue] || {
        label: item.queue,
        data: Array(wallTimes.length).fill(null),
      };
      datasetsMap[item.queue].data[wallTimes.indexOf(item.job_walltime)] =
        item.median_wait_time / 60;
    }
    const datasets = Object.values(datasetsMap);
    datasets.forEach((ds, i) => {
      let colorVar = colorVars[i % (colorVars.length - 1)];
      ds.backgroundColor = getComputedStyle(document.body).getPropertyValue(
        colorVar
      );
    });
    const options = {
      interaction: {
        intersect: false,
        mode: "index",
      },
      plugins: {
        title: {
          display: true,
          text: "Median Wait Time by Queue and Job Wall Time",
        },
      },
      scales: {
        x: {
          title: { display: true, text: "Job Wall Time (Run Time)" },
        },
        y: {
          title: { display: true, text: "Median Wait Time (Minutes)" },
        },
      },
    };
    content = (
      <Chart type="bar" data={{ labels, datasets }} options={options} />
    );
  }

  return (
    <Section
      title="Queue Metrics"
      icon="clock"
      headerComponents={headerComponents}
    >
      {content}
    </Section>
  );
}
