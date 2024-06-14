import { ResourceGroup } from "./resource-group";

export function ResourceCategory({ active, name, resourceGroups, toggleTag }) {
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
            active={active}
            toggleTag={toggleTag}
          />
        ))}
    </>
  );
}
