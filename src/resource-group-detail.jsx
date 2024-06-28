import ResourceGroupDescription from "./resource-group-description";
import ResourceGroupResources from "./resource-group-resources";

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
    </div>
  );
}
