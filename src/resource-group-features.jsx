import { useState } from "react";
import { defaultIcons } from "./icons";
import { useResourceGroup } from "./utils";

import Icon from "./icon";
import Section from "./section";
import { Tag } from "./tag";
import { Tags } from "./tags";

export default function ResourceGroupFeatures({ infoGroupId }) {
  const resourceGroup = useResourceGroup(infoGroupId);
  const [selectedTagId, setSelectedTagId] = useState(null);

  if (!resourceGroup) return;

  const tags = resourceGroup.tags.filter((tag) => tag.tagCategoryId != -1);
  const selectedTag = tags.find((tag) => tag.tagId === selectedTagId);
  const icon = selectedTag?.iconUri || defaultIcons[selectedTag?.name] || "tag";
  const { actionLabel, actionUri, description } = selectedTag || {};

  return (
    tags.length && (
      <Section title="Features" icon="star">
        <Tags>
          {tags.map((tag) => (
            <Tag
              {...tag}
              active={tag.tagId === selectedTagId}
              disabled={!tag.actionUri && !tag.description}
              onClick={(tagId) =>
                setSelectedTagId(selectedTagId == tagId ? null : tagId)
              }
            />
          ))}
        </Tags>
        {selectedTag && (
          <div className="selected-feature">
            <h3>
              {icon.startsWith("http") ? (
                <Icon alt={selectedTag.name} src={icon} />
              ) : (
                <Icon name={icon} />
              )}{" "}
              {selectedTag.name}
            </h3>
            {description && <p>{description}</p>}
            {actionUri && (
              <a href={actionUri} class="btn secondary">
                {actionLabel ? actionLabel : "Learn More"}
              </a>
            )}
          </div>
        )}
      </Section>
    )
  );
}
