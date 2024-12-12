import { useResourceGroup } from "./utils";

import Icon from "./icon";

export default function ResourceGroupDescription({ infoGroupId }) {
  const resourceGroup = useResourceGroup(infoGroupId);
  console.log(resourceGroup);
  if (!resourceGroup) return;
  const { name, description, imageUri, organizations, tags } = resourceGroup;
  return (
    <div class="resource-group-description">
      {imageUri ? (
        <img class="resource-group-feature-image" src={imageUri} />
      ) : null}
      <h1>{resourceGroup.name}</h1>

      {organizations.map((org) => (
        <p>
          <a href={org.organization_url || "#"}>
            {org.organization_favicon_url ? (
              <Icon
                alt={org.organization_name}
                src={org.organization_favicon_url}
              />
            ) : null}
            {org.organization_name}
          </a>
        </p>
      ))}
      {description ? <p>{description}</p> : null}
      <a href="https://allocations.access-ci.org" class="btn secondary lg">
        <Icon name="check2-circle" /> Get Started with {name}
      </a>
      {/* {userGuideUri ? (
        <a href={userGuideUri} class="btn lg">
          <Icon name="book" /> User Guide
        </a>
      ) : null} */}
    </div>
  );
}
