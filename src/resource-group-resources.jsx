import { useMemo } from "preact/hooks";
import { defaultIcons } from "./icons";
import { useJSON } from "./utils";

import Accordion from "./accordion";
import ResourceDetail from "./resource-detail";
import Section from "./section";

const linkResourceData = ({ resources, resourceTypes }) => {
  const resourceTypesMap = {};
  for (let resourceType of resourceTypes) {
    resourceType.resources = [];
    resourceTypesMap[resourceType.resourceTypeId] = resourceType;
  }

  for (let resource of resources) {
    let resourceType = resourceTypesMap[resource.resourceTypeId];
    resourceType.resources.push(resource);
    resource.resourceType = resourceType;
  }

  return { resources, resourceTypes };
};

export default function ResourceGroupResources({ baseUri, resourceGroupId }) {
  const allTypes = useJSON(
    `${baseUri}/api/resource-groups/${resourceGroupId}/resources.json`,
    null
  );
  const types = useMemo(
    () => (allTypes && !allTypes.error ? linkResourceData(allTypes) : null),
    [allTypes]
  );
  if (!types) return;
  return types.resourceTypes.map(({ name, resources }) => {
    if (resources.length)
      return (
        <Section title={name} icon={defaultIcons[name] || "stars"}>
          {resources.map((resource) => (
            <Accordion title={resource.name}>
              <ResourceDetail {...resource} />
            </Accordion>
          ))}
        </Section>
      );
  });
}
