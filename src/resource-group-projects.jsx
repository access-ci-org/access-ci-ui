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

export default function ResourceGroupProjects({ baseUri, resourceGroupId }) {
  const [persona, setPersona] = useState("all");
  const data = useJSON(
    `${baseUri}/api/resource-groups/${resourceGroupId}/projects/${persona}.json`,
    null
  );

  if (!data || data.error) return;

  const headerComponents = [
    <select value={persona} onChange={(e) => setPersona(e.target.value)}>
      <option value="all">All PIs</option>
      <option value="researcher">Researchers</option>
      <option value="educator">Educators</option>
      <option value="grad-student">Graduate Students</option>
    </select>,
  ];

  return (
    <Section
      title="Current Projects"
      icon="pc-display"
      headerComponents={headerComponents}
    >
      <div class="projects-columns">
        {column(data.projects.projectType, "Project Type")}
        {column(
          data.projects.fieldOfScience,
          "Field of Science",
          "Top Fields of Science"
        )}
        {column(
          data.projects.institution,
          "PI's Institution",
          "Top Institutions"
        )}
      </div>
    </Section>
  );
}
