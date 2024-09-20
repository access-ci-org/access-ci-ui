import ResourceGroupAffinityGroup from "./resource-group-affinity-group";
import ResourceGroupDescription from "./resource-group-description";
import ResourceGroupDiscussion from "./resource-group-discussion";
import ResourceGroupDocumentation from "./resource-group-documentation";
import ResourceGroupEvents from "./resource-group-events";
import ResourceGroupProjects from "./resource-group-projects";
import ResourceGroupQueueMetrics from "./resource-group-queue-metrics";
import ResourceGroupResources from "./resource-group-resources";
import ResourceGroupSoftware from "./resource-group-software";
import SectionNavigation from "./section-navigation";

export default function ResourceGroupDetail({ baseUri, infoGroupId }) {
  return (
    <div class="resource-group-detail">
      <ResourceGroupDescription baseUri={baseUri} infoGroupId={infoGroupId} />
      <SectionNavigation />
      <ResourceGroupResources baseUri={baseUri} infoGroupId={infoGroupId} />
      <ResourceGroupEvents baseUri={baseUri} infoGroupId={infoGroupId} />
      <ResourceGroupAffinityGroup baseUri={baseUri} infoGroupId={infoGroupId} />
      <ResourceGroupSoftware baseUri={baseUri} infoGroupId={infoGroupId} />
      <ResourceGroupProjects baseUri={baseUri} infoGroupId={infoGroupId} />
      <ResourceGroupQueueMetrics baseUri={baseUri} infoGroupId={infoGroupId} />
      <ResourceGroupDocumentation baseUri={baseUri} infoGroupId={infoGroupId} />
      <ResourceGroupDiscussion baseUri={baseUri} infoGroupId={infoGroupId} />
    </div>
  );
}
