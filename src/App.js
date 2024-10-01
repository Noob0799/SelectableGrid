import { useState } from "react";
import SelectableGrid from "./components/SelectableGrid";

function App() {
  const [resetGrid, setResetGrid] = useState(false);

  const handleMouseUp = (event) => {
    if(!event.target.classList.contains('grid-cell')) {
      setResetGrid(true);
    }
  }
  return (
    <div className="app" onMouseUp={handleMouseUp}>
      <h1>Selectable Grid</h1>
      <SelectableGrid rows={10} cols={15} resetGrid={resetGrid} setResetGrid={(flag) => setResetGrid(flag)} />
    </div>
  );
}

export default App;
