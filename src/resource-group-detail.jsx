import ResourceGroupDescription from "./resource-group-description";
import ResourceGroupEvents from "./resource-group-events";
import ResourceGroupQueueMetrics from "./resource-group-queue-metrics";
import ResourceGroupResources from "./resource-group-resources";
import ResourceGroupSoftware from "./resource-group-software";

export default function ResourceGroupDetail({ baseUri, resourceGroupId }) {
  return (
    <div class="resource-group-detail">
      <ResourceGroupDescription
        baseUri={baseUri}
        resourceGroupId={resourceGroupId}
      />
      <ResourceGroupResources
        baseUri={baseUri}
        resourceGroupId={resourceGroupId}
      />
      <ResourceGroupEvents
        baseUri={baseUri}
        resourceGroupId={resourceGroupId}
      />
      <ResourceGroupSoftware
        baseUri={baseUri}
        resourceGroupId={resourceGroupId}
      />
      <ResourceGroupQueueMetrics
        baseUri={baseUri}
        resourceGroupId={resourceGroupId}
      />
    </div>
  );
}
