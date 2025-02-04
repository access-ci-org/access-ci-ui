import { useJSON, useResourceGroup } from "./utils";

import Grid from "./grid";
import ResourceDetail from "./resource-detail";
import Section from "./section";

export default function ResourceGroupHardware({ infoGroupId }) {
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

  const computeColumns = resources
    .filter((res) => res.results && res.results.cider_type == "Compute")
    .map((res) => ({
      ...res.results.compute,
      key: res.results.info_resourceid,
      name: res.results.resource_descriptive_name,
      format: (_value, row) => {
        const value = res.results.compute[row.attr];
        return row.format && value
          ? row.format(value, row)
          : value || <>&mdash;</>;
      },
    }));

  const computeRows = resources.length
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
        {
          name: "Operating System",
          attr: "operating_system",
        },
        {
          name: "Batch System",
          attr: "batch_system",
        },
      ].filter((row) => computeColumns.some((col) => col[row.attr]))
    : [];

  const nameColumn = {
    key: "name",
    name: "Attribute",
    format: (value) => <strong>{value}</strong>,
  };

  const hasComputeGrid = computeColumns.length > 0 && computeRows.length > 0;
  const resourceTypes = { compute: [], storage: [], other: [] };

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
              <h3>Specifications</h3>
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
        <Section title="Other Resources" icon="stars">
          {resourceTypes.other}
        </Section>
      ) : null}
    </>
  );
}
