import ResourceGroupAffinityGroup from "./resource-group-affinity-group";
import ResourceGroupDescription from "./resource-group-description";
import ResourceGroupDocumentation from "./resource-group-documentation";
import ResourceGroupEvents from "./resource-group-events";
import ResourceGroupProjects from "./resource-group-projects";
import ResourceGroupQueueMetrics from "./resource-group-queue-metrics";
import ResourceGroupResources from "./resource-group-resources";
import ResourceGroupSoftware from "./resource-group-software";
import SectionNavigation from "./section-navigation";

export default function ResourceGroupDetail({ baseUri, resourceGroupId }) {
  return (
    <div class="resource-group-detail">
      <ResourceGroupDescription
        baseUri={baseUri}
        resourceGroupId={resourceGroupId}
      />
      <SectionNavigation />
      <ResourceGroupResources
        baseUri={baseUri}
        resourceGroupId={resourceGroupId}
      />
      <ResourceGroupEvents
        baseUri={baseUri}
        resourceGroupId={resourceGroupId}
      />
      <ResourceGroupAffinityGroup
        baseUri={baseUri}
        resourceGroupId={resourceGroupId}
      />
      <ResourceGroupSoftware
        baseUri={baseUri}
        resourceGroupId={resourceGroupId}
      />
      <ResourceGroupProjects
        baseUri={baseUri}
        resourceGroupId={resourceGroupId}
      />
      <ResourceGroupQueueMetrics
        baseUri={baseUri}
        resourceGroupId={resourceGroupId}
      />
      <ResourceGroupDocumentation
        baseUri={baseUri}
        resourceGroupId={resourceGroupId}
      />
    </div>
  );
}
