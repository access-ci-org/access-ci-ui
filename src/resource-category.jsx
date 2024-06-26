import { ResourceGroup } from "./resource-group";

export function ResourceCategory({
  active,
  baseUri,
  name,
  resourceGroups,
  toggleTag,
}) {
  return (
    <>
      <h2>{name}</h2>
      {resourceGroups
        .filter(({ resourceGroupId }) =>
          active.resourceGroupIds.has(resourceGroupId)
        )
        .map((resourceGroup) => (
          <ResourceGroup
            {...resourceGroup}
            baseUri={baseUri}
            active={active}
            toggleTag={toggleTag}
          />
        ))}
    </>
  );
}
