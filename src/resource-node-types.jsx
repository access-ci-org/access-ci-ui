const allFields = [
  { key: "count", name: "Nodes" },
  { key: "gpu", name: "GPU" },
  { key: "gpuMemory", name: "GPU Memory" },
  { key: "gpuPerformance", name: "GPU Performance" },
  { key: "cpu", name: "CPU" },
  { key: "ram", name: "RAM" },
  { key: "interconnect", name: "Interconnect" },
  { key: "cache", name: "Cache" },
  { key: "nvCache", name: "NVCache" },
  { key: "localStorage", name: "Local Storage" },
  { key: "network", name: "Network" },
];

export default function ResourceNodeTypes({ nodeTypes }) {
  const fields = new Set();
  for (let nodeType of nodeTypes) for (let field in nodeType) fields.add(field);

  const rows = allFields
    .filter(({ key }) => fields.has(key))
    .map(({ key, name }) => (
      <tr>
        <th>{name}</th>
        {nodeTypes.map((nodeType) => (
          <td>{nodeType[key]}</td>
        ))}
      </tr>
    ));

  return (
    <table class="table">
      <tbody>{rows}</tbody>
    </table>
  );
}
