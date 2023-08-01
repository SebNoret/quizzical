import "./App.css";
import { useState } from "react";
import { Game } from "./components/";
import { QuestionsList } from "./components/";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  function startGame() {
    setIsPlaying(true);
  }
  return (
    <div className="app">
      {!isPlaying ? <Game startGame={startGame} /> : <QuestionsList />}
    </div>
  );
}

export default App;
