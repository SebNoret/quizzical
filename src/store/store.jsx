import LocalStorageManager from "../Api/LocalStorageManager/LocalStorageManager";

export const game = {
  isPlaying: false,
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

      return newState;
    case "START_NEW_GAME":
      const newState2 = {
        ...state,
        isPlaying: false,
      };
      LocalStorageManager.clearStorage();
      LocalStorageManager.saveAppState(newState2);

      return newState2;
    case "CONTINUE_GAME":
      const newState3 = {
        ...state,
        isPlaying: true,
      };

      LocalStorageManager.saveAppState(newState3);
      LocalStorageManager.removeQuestionsList();
      LocalStorageManager.removeScoreDetails();

      return newState3;
    case "PLAY_LATTER":
      const newState4 = {
        ...state,
        isPlaying: false,
      };

      LocalStorageManager.saveAppState(newState4);
      LocalStorageManager.removeQuestionsList();
      LocalStorageManager.removeScoreDetails();

      return newState4;
    case "CANCEL":
      const newState5 = {
        ...state,
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
