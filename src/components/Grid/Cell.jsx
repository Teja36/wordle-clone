import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Cell = ({ letter, rowIndex, colIndex }) => {
  const { currentRow, solution } = useContext(AppContext);

  let variant = "";

  if (rowIndex < currentRow) {
    if (letter === solution.split("")[colIndex]) variant = "green";
    else if (solution.includes(letter)) variant = "yellow";
    else variant = "grey";
  } else if (letter) variant = "active";

  return <div className={`cell ${variant}`}>{letter}</div>;
};

export default Cell;
