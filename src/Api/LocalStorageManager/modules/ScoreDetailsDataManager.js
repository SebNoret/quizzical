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
    if (userData.hasOwnProperty("scoreDetails")) {
      return true;
    }
    return false;
  }

  static saveScoreDetails(scoreDetails) {
    const userData = getData();
    const newUserData = {
      ...userData,
      scoreDetails: scoreDetails,
    };
    setData(undefined, newUserData);
    return true;
  }

  static removeScoreDetails() {
    const userData = getData();
    delete userData.scoreDetails;
    setData(undefined, userData);
    return true;
  }
}

export default ScoreDetailsDataManager;
