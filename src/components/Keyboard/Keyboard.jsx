import React, { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Key from "./Key";

const KEY_MATRIX = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

const Keyboard = () => {
  const [keyStatus, setKeyStatus] = useState({});

  const {
    grid,
    currentRow,
    solution,
    isGameOver,
    handleKeyPress,
    handleEnter,
    handleDelete,
  } = useContext(AppContext);

  const handleKeyBoard = useCallback((e) => {
    if (e.key === "Enter") {
      handleEnter();
    } else if (e.key === "Backspace") {
      handleDelete();
    } else {
      KEY_MATRIX.forEach((row) => {
        row.forEach((key) => {
          if (e.key === key) handleKeyPress(key);
        });
      });
    }
  });

  useEffect(() => {
    if (isGameOver) return;
    document.addEventListener("keydown", handleKeyBoard);

    return () => {
      document.removeEventListener("keydown", handleKeyBoard);
    };
  }, [handleKeyBoard, isGameOver]);

  const checkStatusAfterAttempt = () => {
    if (currentRow === 0) return;

    let currentGuess = grid[currentRow - 1];
    for (let i = 0; i < currentGuess.length; i++) {
      if (currentGuess[i] === solution[i])
        updateKeyStatus(currentGuess[i], "green");
      else if (solution.includes(currentGuess[i]))
        updateKeyStatus(currentGuess[i], "yellow");
      else updateKeyStatus(currentGuess[i], "grey");
    }
  };

  const updateKeyStatus = (key, status) =>
    setKeyStatus((prev) => ({ ...prev, [key]: status }));

  useEffect(() => {
    checkStatusAfterAttempt();
  }, [currentRow]);

  return (
    <div className="keyboard">
      <div className="keyRow">
        {KEY_MATRIX[0].map((letter, index) => (
          <Key
            key={index}
            keyValue={letter}
            keyStatus={keyStatus[letter]}
            handleClick={handleKeyPress}
          />
        ))}
      </div>
      <div className="keyRow">
        {KEY_MATRIX[1].map((letter, index) => (
          <Key
            key={index}
            keyValue={letter}
            keyStatus={keyStatus[letter]}
            handleClick={handleKeyPress}
          />
        ))}
      </div>
      <div className="keyRow">
        <div className="key special" onClick={handleEnter}>
          Enter
        </div>
        {KEY_MATRIX[2].map((letter, index) => (
          <Key
            key={index}
            keyValue={letter}
            keyStatus={keyStatus[letter]}
            handleClick={handleKeyPress}
          />
        ))}
        <div className="key special" onClick={handleDelete}>
          Delete
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
