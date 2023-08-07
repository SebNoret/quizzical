import "./App.css";
import { useReducer } from "react";
import reducer, { game } from "./store/store";
import { GameMenu, GameBoard } from "./components/";
import LocalStorageManager from "./Api/LocalStorageManager";

function getAppStateFromLocalStorage() {
  const appState = LocalStorageManager.getAppState();
  return appState;
}

function App() {
  const [gameState, dispatch] = useReducer(
    reducer,
    getAppStateFromLocalStorage() || game
  );
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
        <GameBoard startNewGame={startNewGame} playLater={playLater} />
      ) : (
        <GameMenu startGame={startGame} continueGame={continueGame} />
      )}
    </div>
  );
}

export default App;
