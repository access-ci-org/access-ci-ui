import { htmlToJsx, useJSON } from "./utils";

import Icon from "./icon";

export default function ResourceGroupDescription({ baseUri, infoGroupId }) {
  const data = useJSON(
    `https://support.access-ci.org/api/1.0/affinity_groups/${infoGroupId}`,
    null,
    { corsProxy: true }
  );
  if (!data || data.error || !data.length) return;
  const name = data[0].title;
  const imageUri = `https://support.access-ci.org/${data[0].field_image}`;
  const description = htmlToJsx(data[0].description);
  // TODO: Add resource provider and user guide data.
  const { resourceProvider, userGuideUri } = data;
  return (
    <div class="resource-group-description">
      {imageUri ? (
        <img class="resource-group-feature-image" src={imageUri} />
      ) : null}
      <h1>{name}</h1>
      {resourceProvider ? (
        <p>
          <a
            href={`/resource-providers/${resourceProvider.resourceProviderId}`}
          >
            {resourceProvider.iconUri ? (
              <Icon
                alt={resourceProvider.name}
                src={resourceProvider.iconUri}
              />
            ) : null}
            {resourceProvider.name}
          </a>
        </p>
      ) : null}
      {description ? <p>{description}</p> : null}
      <a href="#" class="btn secondary lg">
        <Icon name="check2-circle" /> Get Started with {name}
      </a>
      {userGuideUri ? (
        <a href={userGuideUri} class="btn lg">
          <Icon name="book" /> User Guide
        </a>
      ) : null}
    </div>
  );
}
