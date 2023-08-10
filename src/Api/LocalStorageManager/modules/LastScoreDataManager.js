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
    setData(newUserData, undefined);
    return true;
  }

  static hasLastScoreSaved() {
    const userData = getData();
    if (!userData) return false;
    return userData.hasOwnProperty("lastScore");
  }
}

export default LastScoreDataManager;
