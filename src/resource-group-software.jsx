import { useMemo, useState } from "react";
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
  "software_versions",
];

export default function ResourceGroupSoftware({ infoGroupId }) {
  const response = useJSON("https://sds-ara-api.access-ci.org/api/v1", {
    body: JSON.stringify({
      rps: [infoGroupId],
      columns: apiFields,
    }),
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": import.meta.env.VITE_SDS_API_KEY,
    },
    method: "POST",
  });
  const [searchText, setSearchText] = useState("");
  const fuse = useMemo(
    () =>
      response?.data && response.data.length
        ? new Fuse(response.data, {
            keys: [
              { name: "software_name", weight: 0.6 },
              { name: "software_description", weight: 0.4 },
            ],
          })
        : null,
    [response?.data],
  );
  if (!response?.data || !response.data.length) return;

  const highlightFormat = (value) => (
    <Highlight text={value} highlight={searchText} />
  );
  const nameFormat = (value, row) => {
    const name = highlightFormat(value);
    const nameLink = row.software_web_page || row.software_documentation;
    const useLink =
      row.software_use_link && row.software_use_link.length
        ? row.software_use_link[0]
        : "";

    return (
      <span style={{ lineHeight: 1.3 }}>
        {nameLink ? (
          <a key="name" href={nameLink}>
            {name}
          </a>
        ) : (
          name
        )}{" "}
        {row.software_documentation && (
          <a
            key="documentation"
            href={row.software_documentation}
            title={`Documentation for ${value}`}
          >
            <Icon name="book" />
          </a>
        )}{" "}
        {useLink && useLink != row.software_documentation && (
          <a key="use" href={useLink} title={`Usage example for ${value}`}>
            <Icon name="terminal" />
          </a>
        )}
      </span>
    );
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
  const versionsFormat = (_value, row) =>
    row.rps[infoGroupId].software_versions.join(", ");
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
    : response.data;

  const headerComponents = [
    <Search
      key="search"
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
