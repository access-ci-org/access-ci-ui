import { useJSON, useResourceGroup } from "./utils";

import Carousel from "./carousel";
import Grid from "./grid";
import Icon from "./icon";
import ScrollText from "./scroll-text";
import Section from "./section";

const apiBaseUrl = "https://allocations.access-ci.org/current-projects.json";

export function ProjectMetadata({ icon, text, title }) {
  if (!text) return;
  return (
    <abbr class="project-meta" title={title}>
      <Icon name={icon} />
      {text}
    </abbr>
  );
  return;
}

export default function ResourceGroupProjects({ infoGroupId }) {
  const resourceGroup = useResourceGroup(infoGroupId);
  const data = useJSON(
    resourceGroup
      ? `${apiBaseUrl}?${resourceGroup.infoResourceIds
          .map((infoResourceId) => `info_resourceids[]=${infoResourceId}`)
          .join("&")}`
      : null
  );

  if (!data || !data.projects || !data.projects.length) return null;

  const columns = [
    { key: "resourceName", name: "Resource" },
    {
      key: "allocation",
      name: "Current Allocation",
      format: (value, row) =>
        row.units == "[Yes = 1, No = 0]"
          ? value == 1
            ? "Yes"
            : "No"
          : `${value.toLocaleString("en-us")} ${row.units || ""}`,
    },
  ];

  return (
    <Section title="Recent Projects" icon="pc-display">
      <Carousel cssClass="carousel-projects">
        {data.projects.map((project) => (
          <Carousel.Slide>
            <h3>{project.requestTitle}</h3>
            <div class="project-metadata">
              <ProjectMetadata
                icon="cash-coin"
                text={project.allocationType}
                title="Allocation Type"
              />
              <ProjectMetadata
                icon="person-fill"
                text={`${project.pi} (${project.piInstitution})`}
                title="Primary Investigator"
              />
              <ProjectMetadata
                icon="folder"
                text={project.fos}
                title="Field of Science"
              />
              <ProjectMetadata
                icon="calendar-range"
                text={[project.beginDate, project.endDate]
                  .map((dateStr) =>
                    new Date(dateStr).toLocaleString("en-US", {
                      dateStyle: "medium",
                    })
                  )
                  .join(" to ")}
                title="Project Dates"
              />
            </div>
            <ScrollText>
              <p>{project.abstract}</p>
              <Grid
                columns={columns}
                rows={project.resources}
                maxHeight={null}
              />
            </ScrollText>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Section>
  );
}
