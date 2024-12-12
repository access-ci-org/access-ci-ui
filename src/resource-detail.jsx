import { htmlToJsx } from "./utils";

import Accordion from "./accordion";

export default function ResourceDetail({
  resource_descriptive_name,
  resource_description,
  compute,
  storage,
}) {
  const recommendedUse = (compute || storage || {}).recommended_use;
  return (
    <Accordion title={resource_descriptive_name}>
      {resource_description ? htmlToJsx(resource_description) : null}
      {recommendedUse ? (
        <>
          <h3>Recommended Use</h3>
          {htmlToJsx(recommendedUse)}
        </>
      ) : null}
    </Accordion>
  );
}
