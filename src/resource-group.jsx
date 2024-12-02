import Icon from "./icon";
import { Tag } from "./tag";
import { Tags } from "./tags";

export function ResourceGroup({
  active,
  baseUri,
  description,
  imageType,
  imageUri,
  name,
  infoGroupId,
  tags,
  toggleTag,
}) {
  const detailUri = `${baseUri}/${infoGroupId}`;
  return (
    <div class="resource-group">
      <a
        class={`resource-group-image image-type-${imageType}`}
        href={detailUri}
      >
        {imageUri ? <img src={imageUri} /> : <Icon name="motherboard" />}
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
          {description && description}{" "}
          <a href={detailUri}>Learn more about {name} &raquo;</a>
        </p>
      </div>
    </div>
  );
}
