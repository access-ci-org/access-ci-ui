import { useState } from "preact/hooks";
import { useJSON } from "./utils";

import DonutChart from "./donut-chart";
import Section from "./section";

const column = (items, title, topItemsHeading = null) => {
  return (
    <div class="column">
      <DonutChart
        items={items}
        title={title}
        itemLabel="projects"
        topItemsHeading={topItemsHeading}
      />
    </div>
  );
};

export default function ResourceGroupProjects({ baseUri, infoGroupId }) {
  const [persona, setPersona] = useState("all");
  const apiBaseUrl =
    "https://allocations.access-ci.org/current-projects/summary.json";
  const apiUrl = `${apiBaseUrl}?info_groupid=${infoGroupId}&persona=${persona}`;
  const data = useJSON(
    `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`,
    null
  );

  if (!data || data.error) return;

  const stats = {
    "allocation-type": [],
    "field-of-science": [],
    "pi-institution": [],
  };
  for (let stat of data.projectStatistics)
    stats[stat["type"]].push({ name: stat.value, count: stat.count });

  const headerComponents = [
    <select value={persona} onChange={(e) => setPersona(e.target.value)}>
      <option value="all">All PIs</option>
      <option value="researcher">Researchers</option>
      <option value="educator">Educators</option>
      <option value="graduate-student">Graduate Students</option>
    </select>,
  ];

  return (
    <Section
      title="Current Projects"
      icon="pc-display"
      headerComponents={headerComponents}
    >
      <div class="projects-columns">
        {column(stats["allocation-type"], "Project Type")}
        {column(
          stats["field-of-science"],
          "Field of Science",
          "Top Fields of Science"
        )}
        {column(
          stats["pi-institution"],
          "PI's Institution",
          "Top Institutions"
        )}
      </div>
    </Section>
  );
}
