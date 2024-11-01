import Accordion from "./accordion";

const toP = (text) =>
  text ? text.split(/[\n\r]+/g).map((p) => <p>{p}</p>) : null;

export default function ResourceDetail({
  resource_descriptive_name,
  resource_description,
  compute,
  storage,
}) {
  const recommendedUse = (compute || storage || {}).recommended_use;
  return (
    <Accordion title={resource_descriptive_name}>
      {toP(resource_description)}
      {recommendedUse ? (
        <>
          <h3>Recommended Use</h3>
          {toP(recommendedUse)}
        </>
      ) : null}
    </Accordion>
  );
}
