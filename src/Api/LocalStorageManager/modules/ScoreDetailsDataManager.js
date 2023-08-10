import { getData, setData, userDataExists } from "../utils";

class ScoreDetailsDataManager {
  static getScoreDetails() {
    if (!userDataExists()) {
      return false;
    }
    const userData = getData();
    return userData.scoreDetails;
  }

  static isScoreDetailsSaved() {
    const userData = getData();
    if (!userData) return false;
    return userData.hasOwnProperty("scoreDetails");
  }

  static saveScoreDetails(scoreDetails) {
    const userData = getData();
    const newUserData = {
      ...userData,
      scoreDetails: scoreDetails,
    };
    setData(newUserData, undefined);
    return true;
  }

  static removeScoreDetails() {
    const userData = getData();
    delete userData.scoreDetails;
    setData(userData, undefined);
    return true;
  }
}

export default ScoreDetailsDataManager;
