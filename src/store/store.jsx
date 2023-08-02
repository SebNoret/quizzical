import React, { useReducer, createContext } from "react";
import LocalStorageManager from "../Api/LocalStorageManager";

const game = {
  isPlaying: false,
  playLatter: false,
  beginNewGame: false,
};

const GameContext = createContext(null);
const GameDispatchContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "START_NEW_GAME":
      LocalStorageManager.removeUserScore();
      return {
        ...state,
        isPlaying: true,
      };
    case "CONTINUE_GAME":
      return {
        ...state,
        isPlaying: true,
      };
    case "PLAY_LATTER":
      return {
        ...state,
        playLatter: true,
        isPlaying: false,
      };

    default:
      return state;
  }
};

console.log("game", game);
const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, game);

  return (
    <GameContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
};

export { GameContext, GameDispatchContext, GameProvider };
