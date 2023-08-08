import LocalStorageManager from "../Api/LocalStorageManager/LocalStorageManager";

// function getAppStateFromLocalStorage() {
//   console.log("getAppStateFromLocalStorage");
//   const appState = LocalStorageManager.getAppState();
//   return appState;
// }
export const game = {
  isPlaying: false,
  playLatter: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "START_GAME":
      const newState = {
        ...state,
        isPlaying: true,
      };
      LocalStorageManager.clearStorage();
      LocalStorageManager.saveAppState(newState);
      // LocalStorageManager.removeScoreDetails();
      // LocalStorageManager.removeHasPlayed();
      return newState;
    case "START_NEW_GAME":
      const newState2 = {
        ...state,
        isPlaying: false,
        playLatter: false,
      };
      LocalStorageManager.clearStorage();
      LocalStorageManager.saveAppState(newState2);
      // LocalStorageManager.removeScoreDetails();
      // LocalStorageManager.removeHasPlayed();
      return newState2;
    case "CONTINUE_GAME":
      const newState3 = {
        ...state,
        isPlaying: true,
      };

      LocalStorageManager.saveAppState(newState3);
      LocalStorageManager.removeQuestionsList();
      LocalStorageManager.removeScoreDetails();
      // LocalStorageManager.removeHasPlayed();
      return newState3;
    case "PLAY_LATTER":
      const newState4 = {
        ...state,
        playLatter: true,
        isPlaying: false,
      };

      LocalStorageManager.saveAppState(newState4);
      LocalStorageManager.removeQuestionsList();
      LocalStorageManager.removeScoreDetails();
      // LocalStorageManager.removeHasPlayed();
      return newState4;
    case "CANCEL":
      const newState5 = {
        ...state,
        playLatter: false,
        isPlaying: false,
      };
      LocalStorageManager.saveAppState(newState5);
      LocalStorageManager.removeQuestionsList();
      LocalStorageManager.removeScoreDetails();
      return newState5;

    default:
      return state;
  }
};

export default reducer;
