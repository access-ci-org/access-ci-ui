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
  parentInfoGroupId,
  tags,
  toggleTag,
}) {
  const detailUri = `${baseUri}/${parentInfoGroupId || infoGroupId}`;
  return (
    <div className="resource-group">
      <a
        className={`resource-group-image image-type-${imageType}`}
        href={detailUri}
      >
        {imageUri ? <img src={imageUri} /> : <Icon name="motherboard" />}
      </a>
      <div className="resource-group-text">
        <h3>
          <a href={detailUri}>{name}</a>
        </h3>
        <Tags>
          {tags.map((tag) => (
            <Tag
              key={tag.tagId}
              {...tag}
              active={active}
              toggleTag={toggleTag}
            />
          ))}
        </Tags>
        <p>
          {description && description}
          <br />
          <a href={detailUri}>Learn more about {name} &raquo;</a>
        </p>
      </div>
    </div>
  );
}
