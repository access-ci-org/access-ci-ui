import ResourceGroupDescription from "./resource-group-description";

export default function ResourceGroupDetail({ baseUri, resourceId }) {
  return (
    <div class="resource-group-detail">
      <ResourceGroupDescription baseUri={baseUri} resourceId={resourceId} />
    </div>
  );
}
