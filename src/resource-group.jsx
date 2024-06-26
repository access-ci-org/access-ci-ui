import { Tag } from "./tag";
import { Tags } from "./tags";

export function ResourceGroup({
  active,
  baseUri,
  imageType,
  imageUri,
  name,
  summary,
  resourceGroupId,
  tags,
  toggleTag,
}) {
  const detailUri = `${baseUri}/resources/${resourceGroupId}`;
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
          {tags.map((tag) => (
            <Tag {...tag} active={active} toggleTag={toggleTag} />
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
