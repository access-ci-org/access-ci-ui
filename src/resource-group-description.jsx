import { useJSON, useResourceGroup } from "./utils";

import Icon from "./icon";

export default function ResourceGroupDescription({ infoGroupId }) {
  const resourceGroup = useResourceGroup(infoGroupId);
  const firstResource = useJSON(
    resourceGroup && resourceGroup.infoResourceIds.length
      ? `https://operations-api.access-ci.org/wh2/cider/v1/info_resourceid/${resourceGroup.infoResourceIds[0]}/?format=json`
      : null,
  );

  if (!resourceGroup) return;
  const { accessAllocated, name, description, imageUri, organizations } =
    resourceGroup;

  const getStartedUri = accessAllocated
    ? "https://allocations.access-ci.org/get-your-first-project"
    : null;

  const userGuideUri =
    firstResource && firstResource.results
      ? (firstResource.results.compute || firstResource.results.storage || {})
          .user_guide_url
      : null;

  return (
    <div className="resource-group-description">
      {imageUri ? (
        <img className="resource-group-feature-image" src={imageUri} />
      ) : null}
      <h1>{resourceGroup.name}</h1>

      {organizations.map((org) => (
        <p key={org.organization_name}>
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

      <div style={{ marginTop: "1rem" }}>
        {getStartedUri ? (
          <a href={getStartedUri} className="btn secondary lg">
            <Icon name="check2-circle" /> Get Started with {name}
          </a>
        ) : null}
        {userGuideUri ? (
          <a href={userGuideUri} className="btn lg">
            <Icon name="book" /> User Guide
          </a>
        ) : null}
      </div>

      {/*  */}
    </div>
  );
}
