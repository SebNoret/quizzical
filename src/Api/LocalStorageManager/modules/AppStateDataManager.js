import { userDataExists, setData, getData } from "../utils";
class AppStateDataManager {
  static saveAppState(appState) {
    const userData = getData();
    if (!userData) {
      setData(undefined, appState);

      return true;
    } else {
      const newUserData = {
        ...userData,
        isPlaying: appState.isPlaying,
        playLatter: appState.playLatter,
      };

      setData(undefined, newUserData);
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
