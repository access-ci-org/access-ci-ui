import { sortOn } from "./utils";

import { ResourceGroup } from "./resource-group";

export function ResourceGroups({
  categories,
  resourceGroups,
  resourceProviders,
  tags,
  tagCategories,
}) {
  const rpMap = {};
  for (let rp of resourceProviders) rpMap[rp.resourceProviderId] = rp;
  const tagMap = {};
  for (let tag of tags) tagMap[tag.tagId] = tag;
  const categoryGroups = {};
  for (let group of resourceGroups) {
    if (!(group.categoryId in categoryGroups))
      categoryGroups[group.categoryId] = [];
    categoryGroups[group.categoryId].push(group);
  }

  return categories.sort(sortOn("order")).map((category) => {
    return (
      <>
        <h2>{category.name}</h2>
        {(categoryGroups[category.categoryId] || []).map((group) => (
          <ResourceGroup
            imageType={group.imageType}
            imageUri={group.imageUri}
            name={group.name}
            summary={group.summary}
            resourceGroupId={group.resourceGroupId}
            resourceProvider={rpMap[group.resourceProviderId]}
            tags={group.tagIds
              .map((tagId) => tagMap[tagId])
              .sort(sortOn("order"))}
          />
        ))}
      </>
    );
  });
}
