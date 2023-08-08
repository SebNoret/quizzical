import { getData, setData } from "../utils";

class LastScoreDataManager {
  static getLastScore() {
    const userData = getData();
    return userData.lastScore;
  }

  static saveLastScore(lastScore) {
    const userData = getData();
    const newUserData = {
      ...userData,
      lastScore: { correct: lastScore.correct, incorrect: lastScore.incorrect },
    };
    setData(undefined, newUserData);
    return true;
  }

  static hasLastScoreSaved() {
    const userData = getData();
    if (!userData) return false;
    if (userData.hasOwnProperty("lastScore")) {
      return true;
    }
    return false;
  }
}

export default LastScoreDataManager;
