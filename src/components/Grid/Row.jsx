import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Cell from "./Cell";

const Row = ({ row, index }) => {
  const { currentRow, needJiggle } = useContext(AppContext);
  return (
    <div
      className={
        index === currentRow
          ? needJiggle
            ? "row current jiggle"
            : "row current"
          : "row"
      }
    >
      {row.map((letter, i) => {
        return <Cell key={i} letter={letter} colIndex={i} rowIndex={index} />;
      })}
    </div>
  );
};

export default Row;
