import { useJSON, useResourceGroup } from "./utils";

import Grid from "./grid";
import ResourceDetail from "./resource-detail";
import Section from "./section";

export default function ResourceGroupHardware({ baseUri, infoGroupId }) {
  const resourceGroup = useResourceGroup(infoGroupId);
  const resources = useJSON(
    resourceGroup
      ? resourceGroup.infoResourceIds.map(
          (infoResourceId) =>
            `https://operations-api.access-ci.org/wh2/cider/v1/info_resourceid/${infoResourceId}/?format=json`
        )
      : null,
    { defaultValue: [] }
  );
  const computeComp = useJSON(
    "https://operations-api.access-ci.org/wh2/cider/v1/coco/?format=json"
  );
  const compLoaded = computeComp && !computeComp.error;
  const computeColumns =
    compLoaded && resourceGroup
      ? Object.values(computeComp.results.resources)
          .filter((res) =>
            resourceGroup.infoResourceIds.includes(res.info_resourceid)
          )
          .map((res) => ({
            key: res.compute_resource_id,
            name: res.short_name,
            format: (value, row) =>
              row.format && value
                ? row.format(value, row)
                : value || <>&mdash;</>,
          }))
      : [];

  const computeRows = compLoaded
    ? [
        {
          name: "Nodes",
          attr: "node_count",
          format: (value) => value.toLocaleString("en-us"),
        },
        { name: "CPU Type", attr: "cpu_type" },
        {
          name: "CPU Speed",
          attr: "cpu_speed_ghz",
          format: (value) => `${value} Ghz`,
        },
        { name: "CPU Cores per Node", attr: "cpu_count_per_node" },
        {
          name: "RAM per CPU Core",
          attr: "memory_per_cpu_gb",
          format: (value) => `${value.toLocaleString("en-us")} GB`,
        },
        {
          name: "GPU",
          attr: "gpu_description",
        },
        {
          name: "Local Storage per Node",
          attr: "local_storage_per_node_gb",
          format: (value) => `${value.toLocaleString("en-us")} GB`,
        },
        {
          name: "Network Interconnect",
          attr: "interconnect",
        },
      ]
        .map((row) => ({
          ...row,
          ...computeComp.results.attributes[row.attr],
        }))
        .filter((row) => computeColumns.some((col) => row[col.key]))
    : [];

  const nameColumn = {
    key: "name",
    name: "Attribute",
    format: (value) => <strong>{value}</strong>,
  };

  const hasComputeGrid = computeColumns.length > 0 && computeRows.length > 0;
  const resourceTypes = { compute: [], storage: [], other: {} };
  for (let { results: res } of resources)
    (resourceTypes[res.cider_type.toLowerCase()] || resourceTypes.other).push(
      <ResourceDetail {...res} />
    );

  return (
    <>
      {hasComputeGrid || resourceTypes.compute.length > 0 ? (
        <Section title="Compute Resources" icon="cpu-fill">
          {resourceTypes.compute}
          {hasComputeGrid && (
            <>
              <h3>Hardware Specifications</h3>
              <Grid
                columns={[nameColumn, ...computeColumns]}
                rows={computeRows}
                maxHeight={null}
              />
            </>
          )}
        </Section>
      ) : null}
      {resourceTypes.storage.length > 0 ? (
        <Section title="Storage Resources" icon="hdd-fill">
          {resourceTypes.storage}
        </Section>
      ) : null}
      {resourceTypes.other.length > 0 ? (
        <Section title="Specialized Resources" icon="hdd-fill">
          {resourceTypes.storage}
        </Section>
      ) : null}
    </>
  );
}
