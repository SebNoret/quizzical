import "./App.css";
import { useReducer } from "react";
import reducer, { game } from "./store/store";
import { Game } from "./components/";
import { QuestionsList } from "./components/";

function App() {
  const [gameState, dispatch] = useReducer(reducer, game);
  if (gameState === null) {
    return <div>Loading...</div>;
  }
  function startGame() {
    dispatch({ type: "START_GAME" });
  }
  function startNewGame() {
    dispatch({ type: "START_NEW_GAME" });
  }
  function continueGame() {
    dispatch({ type: "CONTINUE_GAME" });
  }

  function playLater() {
    dispatch({ type: "PLAY_LATTER" });
  }

  return (
    <div className="app">
      {gameState.isPlaying && !gameState.playLater ? (
        <QuestionsList startNewGame={startNewGame} playLater={playLater} />
      ) : (
        <Game startGame={startGame} continueGame={continueGame} />
      )}
    </div>
  );
}

export default App;
