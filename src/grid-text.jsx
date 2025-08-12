export default function GridText({ column, row, style = {} }) {
  const value = column.format
    ? column.format(row[column.key], row)
    : row[column.key];

  const classes = ["cell"];
  if (column.class) classes.push(column.class);
  if (column.rowClass) classes.push(column.rowClass(row));

  return (
    <td className={classes.join(" ")} style={style}>
      {value}
    </td>
  );
}
