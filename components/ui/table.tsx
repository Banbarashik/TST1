import type { ProductTableData } from "@/types";

export default function Table({
  tableData,
  ...props
}: {
  tableData: ProductTableData;
} & React.ComponentProps<"table">) {
  return (
    <table {...props}>
      {tableData.caption && <caption>{tableData.caption}</caption>}
      <thead>
        {tableData.headers.map((row, i) => (
          <tr key={i}>
            {row.cells.map((cell, j) => (
              <th
                key={j}
                rowSpan={cell.rowspan}
                colSpan={cell.colspan}
                className={cell.className}
                style={cell.style}
              >
                {cell.content}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {tableData.rows.map((row, i) => (
          <tr key={i}>
            {row.cells.map((cell, j) => (
              <td
                key={j}
                rowSpan={cell.rowspan}
                colSpan={cell.colspan}
                className={cell.className}
                style={cell.style}
              >
                {cell.content}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
