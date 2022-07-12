import React from "react";

const Key = ({ keyValue, handleClick, keyStatus }) => {
  const variant = keyStatus ? " " + keyStatus : "";
  return (
    <div className={"key" + variant} onClick={() => handleClick(keyValue)}>
      {keyValue}
    </div>
  );
};

export default Key;
