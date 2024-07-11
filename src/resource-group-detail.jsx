import ResourceGroupDescription from "./resource-group-description";
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
      <ResourceGroupSoftware
        baseUri={baseUri}
        resourceGroupId={resourceGroupId}
      />
    </div>
  );
}
