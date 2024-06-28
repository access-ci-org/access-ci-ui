import ResourceNodeTypes from "./resource-node-types";

export default function ResourceDetail({ summary, nodeTypes }) {
  return (
    <>
      {summary ? <p>{summary}</p> : null}
      {nodeTypes ? <ResourceNodeTypes nodeTypes={nodeTypes} /> : null}
    </>
  );
}
