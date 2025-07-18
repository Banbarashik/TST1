import React from "react";

function getRowSpan(
  values: any[],
  rows: any[],
  colIdx: number,
  getRowValues: (row: any) => any[],
) {
  let span = 1;
  for (let i = 1; i < rows.length; i++) {
    if (getRowValues(rows[i])[colIdx] === values[colIdx]) {
      span++;
    } else {
      break;
    }
  }
  return span > 1 ? span : undefined;
}

export default function STDSpecsTable({
  rows,
  getRowValues,
  headers,
  ...props
}: {
  rows: any[];
  getRowValues: (row: any) => any[];
  headers: React.ReactNode;
} & React.ComponentProps<"table">) {
  return (
    <table className={`single-table ${props.className}`}>
      {headers}
      <tbody>
        {rows.map((row, rowIdx, arr) => {
          const values = getRowValues(row);
          return (
            <tr key={row.id || rowIdx}>
              {values.map((value, colIdx) => {
                if (
                  rowIdx === 0 ||
                  getRowValues(arr[rowIdx - 1])[colIdx] !== value
                ) {
                  const rowSpan = getRowSpan(
                    values,
                    arr.slice(rowIdx),
                    colIdx,
                    getRowValues,
                  );
                  return (
                    <td key={colIdx} rowSpan={rowSpan}>
                      {value}
                    </td>
                  );
                }
                return null;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
