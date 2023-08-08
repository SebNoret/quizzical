import ScoreDetailsDataManager from "./modules/ScoreDetailsDataManager";
import QuestionListDataManager from "./modules/QuestionListDataManager";
import AppStateDataManager from "./modules/AppStateDataManager";
import LastScoreDataManager from "./modules/LastScoreDataManager";
import StatisticsDataManager from "./modules/StatisticsDataManager";

import { getData, removeData, userDataExists } from "./utils";
class LocalStorageManager {
  /*
   *
   * methods used in statictics component
   *
   */
  static getStorage() {
    if (!userDataExists()) {
      return false;
    }
    return getData();
  }

  static clearStorage() {
    removeData();
    return true;
  }

  /*
   *
   * AppStateDataManager
   *
   */
  static saveAppState(appState) {
    return AppStateDataManager.saveAppState(appState);
  }
  static getAppState() {
    return AppStateDataManager.getAppState();
  }

  /*
   *
   * ScoreDetailsDataManager
   *
   */
  static removeScoreDetails() {
    return ScoreDetailsDataManager.removeScoreDetails();
  }
  static getScoreDetails() {
    return ScoreDetailsDataManager.getScoreDetails();
  }
  static saveScoreDetails(scoreDetails) {
    return ScoreDetailsDataManager.saveScoreDetails(scoreDetails);
  }

  static scoreDetailsExists() {
    return ScoreDetailsDataManager.isScoreDetailsSaved();
  }
  /*
   *
   * LastScoreDataManager
   *
   */
  static hasLastScoreSaved() {
    return LastScoreDataManager.hasLastScoreSaved();
  }
  static getLastScore() {
    return LastScoreDataManager.getLastScore();
  }
  static saveLastScore(lastScore) {
    return LastScoreDataManager.saveLastScore(lastScore);
  }
  /*
   *
   * QuestionListDataManager
   *
   *
   */
  static questionsListExists() {
    return QuestionListDataManager.questionsListExists();
  }
  static getQuestionsList() {
    return QuestionListDataManager.getQuestionsList();
  }
  static saveQuestionsList(questionsList) {
    return QuestionListDataManager.saveQuestionsList(questionsList);
  }
  static removeQuestionsList() {
    return QuestionListDataManager.removeQuestionsList();
  }
  /*
   *
   * StatisticsDataManager
   *
   */
  static updateUserData(totalAnswers, correctAnswers) {
    return StatisticsDataManager.updateUserStats(totalAnswers, correctAnswers);
  }
  static saveUserData(totalAnswers, correctAnswers) {
    return StatisticsDataManager.saveUserStats(totalAnswers, correctAnswers);
  }
  static userScoreExists() {
    return StatisticsDataManager.userStatsExists();
  }
}

export default LocalStorageManager;
