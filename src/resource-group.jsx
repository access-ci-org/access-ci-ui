import { Tag } from "./tag";
import { Tags } from "./tags";

export function ResourceGroup({
  imageType,
  imageUri,
  name,
  summary,
  resourceGroupId,
  resourceProvider,
  tags,
}) {
  const detailUri = `/resources/${resourceGroupId}`;
  return (
    <div class="resource-group">
      <a
        class={`resource-group-image image-type-${imageType}`}
        href={detailUri}
      >
        {imageUri ? <img src={imageUri} /> : null}
      </a>
      <div class="resource-group-text">
        <h3>
          <a href={detailUri}>{name}</a>
        </h3>
        <Tags>
          <Tag
            collection="resource-providers"
            tagId={resourceProvider.resourceProviderId}
            name={resourceProvider.name}
            icon={resourceProvider.iconUri}
          />
          {tags.map((tag) => (
            <Tag tagId={tag.tagId} name={tag.name} />
          ))}
        </Tags>
        <p>
          {summary && summary}{" "}
          <a href={detailUri}>Learn more about {name} &raquo;</a>
        </p>
      </div>
    </div>
  );
}
