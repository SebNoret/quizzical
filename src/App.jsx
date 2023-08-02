import "./App.css";
import { useState, useReducer } from "react";
import { GameContext, GameDispatchContext, GameProvider } from "./store/store";
// import { game, reducer } from "./store/store";
import { Game } from "./components/";
import { QuestionsList } from "./components/";

function App() {
  // const [isPlaying, setIsPlaying] = useState(false);

  // const [gameState, dispatch] = useReducer(reducer, game);

  // const [playLatter, setplayLatter] = useState(false);
  // const [beginNewGame, setBeginNewGame] = useState(false);
  function startNewGame() {
    // LocalStorageManager.removeUserScore();
    // setIsPlaying(true);
    dispatch({ type: "START_NEW_GAME" });
  }

  function continueGame() {
    // setIsPlaying(true);
    dispatch({ type: "CONTINUE_GAME" });
  }

  function playLater() {
    dispatch({ type: "PLAY_LATTER" });
  }

  return (
    <GameProvider>
      <GameContext.Provider value={gameState}>
        <GameDispatchContext.Provider value={dispatch}>
          <div className="app">
            {!gameState.isPlaying || gameState.playLatter ? (
              <Game startNewGame={startNewGame} continueGame={continueGame} />
            ) : (
              <QuestionsList
                startNewGame={startNewGame}
                playLater={playLater}
              />
            )}
          </div>
        </GameDispatchContext.Provider>
      </GameContext.Provider>
    </GameProvider>
  );
}

export default App;
