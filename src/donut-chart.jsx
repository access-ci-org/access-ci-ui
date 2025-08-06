import { useEffect, useState } from "react";

const circleCoords = (pct, radius) =>
  `${Math.cos(2 * Math.PI * pct) * radius} ${
    Math.sin(2 * Math.PI * pct) * radius
  }`;

const formatItem = (
  { name, count },
  total = null,
  itemLabel,
  separator = "",
  noBreak = false,
) => {
  return (
    <>
      <strong>
        {name}
        {separator}
      </strong>{" "}
      <span>
        {count.toLocaleString()}
        {noBreak ? <>&nbsp;</> : " "}
        {itemLabel}
      </span>
      {total !== null ? (
        <>
          {" "}
          <span className="percent">
            (
            {((count * 100) / total).toLocaleString("en-US", {
              maximumFractionDigits: 1,
            })}
            %)
          </span>
        </>
      ) : null}
    </>
  );
};

export default function DonutChart({
  colors = [
    "var(--teal-700)",
    "var(--yellow-400)",
    "var(--teal-400)",
    "var(--orange-400)",
    "var(--green-400)",
    "var(--red-400)",
  ],
  title,
  itemLabel = "",
  items,
  topItems = 3,
  topItemsHeading = null,
}) {
  const [activeIdx, setActiveIdx] = useState(null);

  // Reset the active index when the items change.
  useEffect(() => setActiveIdx(null), [items]);

  const sortedItems = items.toSorted((a, b) =>
    a.count < b.count || (a.count == b.count && a.name < b.name) ? 1 : -1,
  );
  const total = items
    .map(({ count }) => count)
    .reduce((result, count) => result + count, 0);
  let cumulativePct = -0.25;

  const svgPaths = sortedItems.map(({ name, count }, i) => {
    const pct = count / total;
    if (pct == 0) return null;
    const startPct = cumulativePct;
    const endPct = (cumulativePct += pct);
    const lgArc = pct > 0.5 ? 1 : 0;
    const pathData = [
      `M ${circleCoords(startPct, 100)}`,
      `A 100 100 0 ${lgArc} 1 ${circleCoords(endPct, 100)}`,
      `L ${circleCoords(endPct, 75)}`,
      `A 75 75 0 ${lgArc} 0 ${circleCoords(startPct, 75)}`,
      `L ${circleCoords(startPct, 100)}`,
    ].join(" ");
    return (
      <path
        key={name}
        d={pathData}
        style={{
          fill: colors[i % colors.length],
          opacity: activeIdx === null ? 1 : i === activeIdx ? 1 : 0.5,
        }}
        onClick={(e) => {
          e.stopPropagation();
          setActiveIdx(activeIdx === i ? null : i);
        }}
      />
    );
  });
  const activeItem = activeIdx === null ? null : items[activeIdx];
  const labelContent =
    activeItem === null ? (
      <>
        <strong>{title}</strong>{" "}
        <span>
          {total.toLocaleString()} {itemLabel}
        </span>
      </>
    ) : (
      <>
        <strong>{activeItem.name}</strong>{" "}
        <span>
          {activeItem.count.toLocaleString()} {itemLabel}
        </span>
        <span className="percent">
          (
          {((activeItem.count * 100) / total).toLocaleString("en-US", {
            maximumFractionDigits: 1,
          })}
          %)
        </span>
      </>
    );
  const svgLabel = (
    <foreignObject key="center-text" x="-50" y="-50" width="100" height="100">
      <div className="center-text">{labelContent}</div>
    </foreignObject>
  );

  return (
    <div className="donut-chart">
      <svg
        version="1.1"
        viewBox="-100 -100 200 200"
        width="200"
        height="200"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => setActiveIdx(null)}
      >
        {svgPaths}
        {svgLabel}
      </svg>
      {topItems > 0 ? (
        <>
          <h3>{topItemsHeading || `Top ${title}s`}</h3>
          <ul className="top-items">
            {sortedItems.slice(0, topItems).map((item, i) => (
              <li>
                <span
                  className="symbol"
                  style={{ backgroundColor: colors[i % colors.length] }}
                ></span>
                <span>{formatItem(item, null, itemLabel, ":", true)}</span>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}
