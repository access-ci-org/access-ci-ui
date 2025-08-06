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
        .filter(({ infoGroupId }) => active.infoGroupIds.has(infoGroupId))
        .map((resourceGroup) => (
          <ResourceGroup
            key={resourceGroup.infoGroupId}
            {...resourceGroup}
            baseUri={baseUri}
            active={active}
            toggleTag={toggleTag}
          />
        ))}
    </>
  );
}
