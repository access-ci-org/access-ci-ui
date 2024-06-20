import ResourceGroupDescription from "./resource-group-description";

export default function ResourceGroupDetail({ resourceId }) {
  return (
    <div class="resource-group-detail">
      <ResourceGroupDescription resourceId={resourceId} />
    </div>
  );
}
