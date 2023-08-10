import { userDataExists, setData, getData } from "../utils";
class AppStateDataManager {
  static saveAppState(appState) {
    const userData = getData();
    if (!userData) {
      setData(appState, undefined);

      return true;
    } else {
      const newUserData = {
        ...userData,
        isPlaying: appState.isPlaying,
        playLatter: appState.playLatter,
      };

      setData(newUserData, undefined);
      return true;
    }
  }

  static getAppState() {
    if (!userDataExists()) {
      return false;
    }
    const userData = getData();

    return { isPlaying: userData.isPlaying, playLatter: userData.playLatter };
  }
}

export default AppStateDataManager;
