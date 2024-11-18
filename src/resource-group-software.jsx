import { useMemo, useState } from "preact/hooks";
import { useJSON } from "./utils";
import Fuse from "fuse.js";

import Grid from "./grid";
import Highlight from "./highlight";
import Icon from "./icon";
import Search from "./search";
import Section from "./section";

const apiFields = [
  "software_name",
  "software_description",
  "software_web_page",
  "software_documentation",
  "software_use_link",
];

export default function ResourceGroupSoftware({ infoGroupId }) {
  const data = useJSON(
    `https://ara-db.ccs.uky.edu/api=API_0/${
      import.meta.env.VITE_SDS_API_KEY
    }/rp=${infoGroupId}?include=${apiFields.join(",")}`
  );
  const [searchText, setSearchText] = useState("");
  const fuse = useMemo(
    () =>
      data && data.length
        ? new Fuse(data, {
            keys: [
              { name: "software_name", weight: 0.6 },
              { name: "software_description", weight: 0.4 },
            ],
          })
        : null,
    [data]
  );
  if (!data || !data.length) return;

  const highlightFormat = (value) => (
    <Highlight text={value} highlight={searchText} />
  );
  const nameFormat = (value, row) => {
    const result = [];
    const name = highlightFormat(value);
    const nameLink = row.software_web_page || row.software_documentation;
    result.push(nameLink ? <a href={nameLink}>{name}</a> : name);
    if (row.software_documentation)
      result.push(
        <> </>,
        <a
          href={row.software_documentation}
          title={`Documentation for ${value}`}
        >
          <Icon name="book" />
        </a>
      );
    if (
      row.software_use_link &&
      row.software_use_link != row.software_documentation
    )
      result.push(
        <> </>,
        <a
          href={row.software_use_link.split("\n")[0].trim()}
          title={`Usage example for ${value}`}
        >
          <Icon name="terminal" />
        </a>
      );
    return <span style={{ lineHeight: 1.3 }}>{result}</span>;
  };
  const descriptionFormat = (value, row) => {
    const sourcePattern = /Description Source:[ ]+(http[^ ]+)/;
    const match = value.match(sourcePattern);
    return (
      <>
        {highlightFormat(value.replace(sourcePattern, ""))}{" "}
        {match ? (
          <a
            href={match[1]}
            title={`Description source for ${row.software_name}`}
          >
            <Icon name="info-circle" />
          </a>
        ) : null}
      </>
    );
  };
  const versionsFormat = (value, row) => {
    return value.map((item) =>
      item.replace(`${row.rp_name}: `, "").split(",").join(", ")
    );
  };
  const columns = [
    {
      key: "software_name",
      name: "Package",
      format: nameFormat,
    },
    {
      key: "software_versions",
      name: "Versions",
      format: versionsFormat,
    },
    {
      key: "software_description",
      name: "Description",
      format: descriptionFormat,
    },
  ];

  const rows = searchText.length
    ? fuse.search(searchText).map((result) => result.item)
    : data;

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
