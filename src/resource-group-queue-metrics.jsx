import { useState } from "preact/hooks";
import { useJSON, useResourceGroupResources } from "./utils";

import Section from "./section";
import Chart from "./chart";
import Icon from "./icon";

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
    content = (
      <div class="cards">
        {overview.map(
          ({
            info_resourceid,
            job_count,
            median_expansion_factor,
            median_wait_time,
            median_wall_time,
            resource_descriptive_name,
          }) => {
            return (
              <p class="card metrics-overview">
                <b>{formatName(resource_descriptive_name)}:</b> Users ran{" "}
                <strong>
                  <Icon name="file-earmark-code" />
                  {parseInt(job_count).toLocaleString("en-us")} jobs
                </strong>{" "}
                during the last 30 days. Waiting in the queue caused an average{" "}
                <strong>
                  <Icon name="calculator" />
                  {((median_expansion_factor - 1) * 100).toLocaleString(
                    "en-us",
                    {
                      maximumFractionDigits: 0,
                    }
                  )}
                  % increase
                </strong>{" "}
                in the total completion time. The average job waited for{" "}
                <strong>
                  <Icon name="hourglass-split" /> {formatTime(median_wait_time)}
                </strong>{" "}
                and ran for{" "}
                <strong>
                  <Icon name="stopwatch" />
                  {formatTime(median_wall_time)}
                </strong>
                .{" "}
                <a
                  title={`Wait time chart for ${formatName(
                    resource_descriptive_name
                  )}`}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setView(info_resourceid);
                  }}
                >
                  View chart &raquo;
                </a>
              </p>
            );
          }
        )}
      </div>
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
    const overviewItem = overview.find(
      (item) => item.info_resourceid == detailMetrics.info_resource_id
    );
    const options = {
      interaction: {
        intersect: false,
        mode: "index",
      },
      plugins: {
        title: {
          display: true,
          text: `Median Wait Time by Queue on ${formatName(
            overviewItem.resource_descriptive_name
          )}: Last 30 Days`,
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
      <>
        <Chart type="bar" data={{ labels, datasets }} options={options} />
        <p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setView("overview");
            }}
          >
            &laquo; Back to overview
          </a>
        </p>
      </>
    );
  }

  return (
    <Section
      title="Wait Time"
      icon="hourglass-split"
      headerComponents={headerComponents}
    >
      {content}
    </Section>
  );
}
