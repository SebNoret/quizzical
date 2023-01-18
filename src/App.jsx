import "./App.css";
import { useState } from "react";
import Game from "./Game";
import Questions from "./Questions";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  function startGame() {
    setIsPlaying(true);
  }
  return (
    <div className="App">
      {!isPlaying ? <Game startGame={startGame} /> : <Questions />}
    </div>
  );
}

export default App;
