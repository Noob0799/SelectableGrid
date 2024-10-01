import { useEffect, useState } from "react";

function SelectableGrid({ rows = 10, cols = 10, resetGrid, setResetGrid }) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [selectedCells, setSelectedCells] = useState([]);

  useEffect(() => {
    if(resetGrid) {
      setIsMouseDown(false);
      setSelectedCells([]);
    }
  }, [resetGrid]);

  const handleMouseDown = (x, y) => {
    setIsMouseDown(true);
    setSelectedCells([x * cols + y + 1]);
    setResetGrid(false);
  };
  const handleMouseEnter = (x, y) => {
    if (isMouseDown) {
      const firstRow = Math.ceil(selectedCells[0] / cols) - 1;
      const firstCol = (selectedCells[0] % cols) == 0 ? cols - 1 : (selectedCells[0] % cols) - 1;
      const minRow = Math.min(firstRow, x);
      const minCol = Math.min(firstCol, y);
      const maxRow = Math.max(firstRow, x);
      const maxCol = Math.max(firstCol, y);

      const newSelectedCells = [];
      if(firstRow == minRow && firstCol == minCol) {
        for (let i = minRow; i <= maxRow; i++) {
          for (let j = minCol; j <= maxCol; j++) {
            newSelectedCells.push(i * cols + j + 1);
          }
        }
      } else if(firstRow == maxRow && firstCol == maxCol) {
        for (let i = maxRow; i >= minRow; i--) {
          for (let j = maxCol; j >= minCol; j--) {
            newSelectedCells.push(i * cols + j + 1);
          }
        }
      } else if(firstRow == maxRow && firstCol == minCol) {
        for (let i = maxRow; i >= minRow; i--) {
          for (let j = minCol; j <= maxCol; j++) {
            newSelectedCells.push(i * cols + j + 1);
          }
        }
      } else if(firstRow == minRow && firstCol == maxCol) {
        for (let i = minRow; i <= maxRow; i++) {
          for (let j = maxCol; j >= minCol; j--) {
            newSelectedCells.push(i * cols + j + 1);
          }
        }
      }
      setSelectedCells(newSelectedCells);
    }
  };
  const handleMouseUp = () => {
    setIsMouseDown(false);
  }
  return (
    <div className="grid" style={{ "--rows": rows, "--cols": cols }} onMouseUp={handleMouseUp}>
      {[...Array(rows).keys()].map((_, i) => {
        return [...Array(cols).keys()].map((_, j) => (
          <div
            className={`grid-cell ${
              selectedCells.includes(i * cols + j + 1) ? "selected" : ""
            }`}
            key={i * cols + j + 1}
            onMouseDown={() => handleMouseDown(i, j)}
            onMouseEnter={() => handleMouseEnter(i, j)}
          >
            {i * cols + j + 1}
          </div>
        ));
      })}
    </div>
  );
}

export default SelectableGrid;
