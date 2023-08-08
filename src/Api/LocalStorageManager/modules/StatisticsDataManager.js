import { getData, setData } from "../utils";
class StatisticsDataManager {
  static updateUserStats(totalAnswers, correctAnswers) {
    const score = getData();
    score.totalAnswers = Number(score.totalAnswers) + totalAnswers;
    score.correctAnswers = (Number(score.correctAnswers) || 0) + correctAnswers;
    score.totalGamePlayed = score.totalGamePlayed + 1;
    setData(undefined, score);
  }

  static saveUserStats(totalAnswers, correctAnswers) {
    const userData = getData();
    const data = {
      ...userData,
      totalAnswers: totalAnswers,
      correctAnswers: correctAnswers,
      totalGamePlayed: 1,
    };
    setData(undefined, data);
    return true;
  }

  static userStatsExists() {
    const userData = getData();
    if (!userData) return false;
    if (
      userData.hasOwnProperty("totalAnswers") &&
      userData.hasOwnProperty("correctAnswers")
    ) {
      return true;
    }
    return false;
  }
}

export default StatisticsDataManager;
