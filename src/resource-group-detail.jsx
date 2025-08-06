import { useParams } from "react-router";
import Breadcrumbs from "./breadcrumbs";
import ResourceGroupAffinityGroup from "./resource-group-affinity-group";
import ResourceGroupDescription from "./resource-group-description";
import ResourceGroupDiscussion from "./resource-group-discussion";
import ResourceGroupDocumentation from "./resource-group-documentation";
import ResourceGroupEvents from "./resource-group-events";
import ResourceGroupHardware from "./resource-group-hardware";
import ResourceGroupProjects from "./resource-group-projects";
import ResourceGroupQueueMetrics from "./resource-group-queue-metrics";
import ResourceGroupSoftware from "./resource-group-software";
import SectionNavigation from "./section-navigation";
import { useResourceGroup } from "./utils";

export default function ResourceGroupDetail({
  baseUri,
  showBreadcrumbs = true,
}) {
  const { infoGroupId } = useParams();
  const resourceGroup = useResourceGroup(infoGroupId);

  const breadcrumbItems = [{ name: "Resources", href: baseUri }];
  if (resourceGroup) breadcrumbItems.push({ name: resourceGroup.name });

  return (
    <>
      {showBreadcrumbs && (
        <Breadcrumbs
          expandWidth={true}
          items={breadcrumbItems}
          topBorder={true}
        />
      )}
      <div className="resource-group-detail">
        <ResourceGroupDescription infoGroupId={infoGroupId} />
        <SectionNavigation />
        <ResourceGroupHardware infoGroupId={infoGroupId} />
        <ResourceGroupDocumentation infoGroupId={infoGroupId} />
        <ResourceGroupEvents infoGroupId={infoGroupId} />
        <ResourceGroupAffinityGroup infoGroupId={infoGroupId} />
        <ResourceGroupSoftware infoGroupId={infoGroupId} />
        <ResourceGroupProjects infoGroupId={infoGroupId} />
        <ResourceGroupQueueMetrics infoGroupId={infoGroupId} />
        <ResourceGroupDiscussion infoGroupId={infoGroupId} />
      </div>
    </>
  );
}
