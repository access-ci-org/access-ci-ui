import { useResourceGroup } from "./utils";

import Icon from "./icon";

export default function ResourceGroupDescription({ infoGroupId }) {
  const resourceGroup = useResourceGroup(infoGroupId);
  if (!resourceGroup) return;
  const { name, description, imageUri, tags } = resourceGroup;
  return (
    <div class="resource-group-description">
      {imageUri ? (
        <img class="resource-group-feature-image" src={imageUri} />
      ) : null}
      <h1>{resourceGroup.name}</h1>

      {tags
        .filter((tag) => tag.tagCategory.name == "Resource Provider")
        .map((tag) => (
          <p>
            <a href="#">
              {tag.iconUri ? <Icon alt={tag.name} src={tag.iconUri} /> : null}
              {tag.name}
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
