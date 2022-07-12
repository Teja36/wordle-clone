import React, { useContext } from "react";
import "./App.css";

import Grid from "./components/Grid/Grid";
import Keyboard from "./components/Keyboard/Keyboard";
import Modal from "./components/Modal";
import { AppContext } from "./context/AppContext";

function App() {
  const { isGameOver, isWon, solution, toastMessage } = useContext(AppContext);

  return (
    <div className="App">
      <h1>Wordle</h1>

      {(isGameOver || toastMessage) && (
        <Modal
          isWon={isWon}
          solution={solution}
          autoClose
          toast={toastMessage}
          delay={!!(isWon || isGameOver)}
        />
      )}

      <Grid />
      <Keyboard />
    </div>
  );
}

export default App;
