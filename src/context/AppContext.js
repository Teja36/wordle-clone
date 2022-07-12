import { createContext, useState } from "react";
import { WORDS } from "../constants/wordlist";
import { VALID_GUESSES } from "../constants/validGuessesList";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [solution] = useState(WORDS[Math.floor(Math.random() * WORDS.length)]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [needJiggle, setNeedJiggle] = useState(false);
  const [grid, setGrid] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentPos, setCurrentPos] = useState(0);

  const shootToast = (message) => {
    setTimeout(() => setToastMessage(message), 500);
    setTimeout(() => setToastMessage(""), 2500);
  };

  const performJiggle = () => {
    setNeedJiggle(true);
    setTimeout(() => setNeedJiggle(false), 500);
  };

  const handleKeyPress = (key) => {
    if (currentPos >= 5 || currentRow >= 6) return;

    let newGrid = [...grid];

    newGrid[currentRow][currentPos] = key;

    setGrid(newGrid);
    setCurrentPos((prev) => prev + 1);
  };

  const handleEnter = () => {
    if (currentPos < 5) {
      performJiggle();
      shootToast("Not enough letters!");
      return;
    }

    const row = grid[currentRow];

    if (!VALID_GUESSES.includes(row.join(""))) {
      performJiggle();
      shootToast("Word not found!");
      return;
    }
    setCurrentPos(0);
    setCurrentRow((prev) => prev + 1);

    if (row.join("") === solution) {
      setIsWon(true);
      setIsGameOver(true);
    }

    if (currentRow === 5) {
      setIsGameOver(true);
    }
  };

  const handleDelete = () => {
    if (currentPos <= 0) return;

    let newGrid = [...grid];
    newGrid[currentRow][currentPos - 1] = "";

    setGrid(newGrid);
    setCurrentPos((prev) => prev - 1);
  };

  const values = {
    grid,
    currentRow,
    currentPos,
    solution,
    isGameOver,
    isWon,
    toastMessage,
    needJiggle,

    handleKeyPress,
    handleEnter,
    handleDelete,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
