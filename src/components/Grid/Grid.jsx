import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import Row from "./Row";

const Grid = () => {
  const { grid } = useContext(AppContext);

  return (
    <div className="grid">
      {grid.map((row, index) => {
        return <Row key={index} row={row} index={index} />;
      })}
    </div>
  );
};

export default Grid;
