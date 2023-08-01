import "./App.css";
import { useState } from "react";
import { Game } from "./components/";
import { QuestionsList } from "./components/";
import LocalStorageManager from "./storage/localStorageManager";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playLatter, setplayLatter] = useState(false);
  const [beginNewGame, setBeginNewGame] = useState(false);
  function startNewGame() {
    LocalStorageManager.removeUserScore();
    setIsPlaying(true);
  }

  function continueGame() {
    setIsPlaying(true);
  }

  return (
    <div className="app">
      {!isPlaying ? (
        <Game startNewGame={startNewGame} continueGame={continueGame} />
      ) : (
        <QuestionsList startNewGame={startNewGame} />
      )}
    </div>
  );
}

export default App;
