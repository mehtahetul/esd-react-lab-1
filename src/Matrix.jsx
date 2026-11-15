// Section 06 — the grid: a Matrix made of Cells.
//
// Props:  matrix        an array of rows, each an array of numbers (any size — don't assume 3)
//         onIncrement   a function: onIncrement(row, col)   (you need it in section 08)
//         onDecrement   (in-lab) a function: onDecrement(row, col), on a right-click
//
// Render:
//   <table className="matrix">
//     <tbody>
//       one <tr> per row
//         one <td> per value, with a <Cell> inside it
//         (in-lab stretch) then one <td className="total"> with that row's total
//
// Lists need a key on the element you return from map — section 06 says which.
// Section 08: each Cell's onClick calls onIncrement with THAT cell's row and column.
import Cell from "./Cell.jsx";
import { stats } from "./matrix.js";

export default function Matrix({ matrix, onIncrement, onDecrement }) {
  // Section 12 (stretch): the biggest number, derived on every render.
  const { max } = stats(matrix);

  return (
    <table className="matrix">
      <tbody>
        {matrix.map((rowValues, r) => (
          // The grid never reorders, so the index is a stable key here.
          <tr key={r}>
            {rowValues.map((value, c) => (
              <td key={c}>
                <Cell
                  row={r}
                  col={c}
                  value={value}
                  isMax={max > 0 && value === max}
                  onClick={() => onIncrement(r, c)}
                  onDecrement={onDecrement ? () => onDecrement(r, c) : undefined}
                />
              </td>
            ))}
            <td className="total" aria-label={`Row ${r + 1} total`}>
              {rowValues.reduce((total, value) => total + value, 0)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
