import { useState } from "preact/hooks";
import { useJSON } from "./utils";

import Grid from "./grid";
import { MiniBar } from "./mini-bar";
import Section from "./section";

const column = (items, title, topItemsHeading) => {
  const columns = [
    { key: "value", name: title },
    {
      key: "count",
      name: "Projects",
      format: (value) => (
        <div class="project-count">
          <span class="count">{value.toLocaleString("en-US")}</span>
          <MiniBar value={value} maxValue={items[0].count} />
        </div>
      ),
    },
  ];
  return (
    <div class="column">
      <h3>{topItemsHeading}</h3>
      <Grid columns={columns} rows={items} />
    </div>
  );
};

export default function ResourceGroupProjects({ baseUri, infoGroupId }) {
  const [persona, setPersona] = useState("all");
  const apiBaseUrl =
    "https://allocations.access-ci.org/current-projects/summary.json";
  const apiUrl = `${apiBaseUrl}?info_groupid=${infoGroupId}&persona=${persona}`;
  const data = useJSON(apiUrl, null, { corsProxy: true });

  if (!data || data.error) return;

  const stats = {
    "allocation-type": [],
    "field-of-science": [],
    "pi-institution": [],
  };
  for (let stat of data.projectStatistics) stats[stat["type"]].push(stat);

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
        {column(stats["allocation-type"], "Project Type", "Top Project Types")}
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
