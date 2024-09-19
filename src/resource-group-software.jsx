import { useMemo, useState } from "preact/hooks";
import { useJSON } from "./utils";
import Fuse from "fuse.js";

import Grid from "./grid";
import Highlight from "./highlight";
import Search from "./search";
import Section from "./section";

export default function ResourceGroupSoftware({ baseUri, infoGroupId }) {
  const data = useJSON(
    `${baseUri}/api/resource-groups/${infoGroupId}/software.json`,
    null
  );
  const [searchText, setSearchText] = useState("");
  const fuse = useMemo(
    () =>
      data && !data.error
        ? new Fuse(data.software, {
            keys: [
              { name: "name", weight: 0.7 },
              { name: "summary", weight: 0.3 },
            ],
          })
        : null,
    [data]
  );
  if (!data || data.error) return;

  const highlightFormat = (value) => (
    <Highlight text={value} highlight={searchText} />
  );
  const columns = [
    {
      key: "name",
      name: "Package",
      format: highlightFormat,
    },
    {
      key: "summary",
      name: "Description",
      format: highlightFormat,
    },
  ];

  const rows = searchText.length
    ? fuse.search(searchText).map((result) => result.item)
    : data.software;

  const headerComponents = [
    <Search
      placeholder="Search software packages..."
      setSearchText={setSearchText}
    />,
  ];

  return (
    <Section
      title="Software"
      icon="terminal"
      headerComponents={headerComponents}
    >
      <Grid columns={columns} rows={rows} scrollResetOnUpdate={true} />
    </Section>
  );
}
