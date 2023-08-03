import LocalStorageManager from "../Api/LocalStorageManager";
export const game = {
  isPlaying: false,
  playLatter: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "START_GAME":
      LocalStorageManager.removeUserScore();
      return {
        ...state,
        isPlaying: true,
      };
    case "START_NEW_GAME":
      LocalStorageManager.removeUserScore();
      return {
        ...state,
        isPlaying: false,
        playLatter: false,
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

export default reducer;
