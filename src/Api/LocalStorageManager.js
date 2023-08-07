class LocalStorageManager {
  static saveAppState(appState) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      localStorage.setItem("userData", JSON.stringify(appState));
      return true;
    } else {
      const newUserData = {
        ...userData,
        isPlaying: appState.isPlaying,
        playLatter: appState.playLatter,
      };

      localStorage.setItem("userData", JSON.stringify(newUserData));
      return true;
    }
  }
  static removeScoreDetails() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    delete userData.scoreDetails;
    localStorage.setItem("userData", JSON.stringify(userData));
    return true;
  }
  static removeHasPlayed() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    delete userData.hasPlayed;
    localStorage.setItem("userData", JSON.stringify(userData));
    return true;
  }
  static removeUserData() {
    localStorage.removeItem("userData");
    return true;
  }
  static hasUserAnswsersSaved() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) return false;
    if (userData.hasOwnProperty("scoreDetails")) {
      return true;
    }

    return false;
  }
  static getScoreDetails() {
    // if (!this.userDataExists()) {
    //   return false;
    // }
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData.scoreDetails;
  }
  static hasLastScoreSaved() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) return false;
    if (userData.hasOwnProperty("lastScore")) {
      return true;
    }

    return false;
  }
  static getLastScore() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData.lastScore;
  }
  static questionsListExists() {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (
      !userData.hasOwnProperty("questionsList") ||
      userData.questionsList.length === 0
    ) {
      return false;
    } else {
      return true;
    }
  }
  static getQuestionsList() {
    if (!this.userDataExists()) {
      return false;
    }
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData.questionsList;
  }
  static saveQuestionsList(questionsList) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const newUserData = {
      ...userData,
      questionsList: questionsList,
    };
    localStorage.setItem("userData", JSON.stringify(newUserData));
    return true;
  }
  static saveScoreDetails(scoreDetails) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const newUserData = {
      ...userData,
      scoreDetails: scoreDetails,
    };
    localStorage.setItem("userData", JSON.stringify(newUserData));
    return true;
  }
  static saveLastScore(lastScore) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const newUserData = {
      ...userData,
      lastScore: { correct: lastScore.correct, incorrect: lastScore.incorrect },
    };
    localStorage.setItem("userData", JSON.stringify(newUserData));
    return true;
  }
  static userScoreExists() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) return false;
    if (
      userData.hasOwnProperty("totalAnswers") &&
      userData.hasOwnProperty("correctAnswers")
    ) {
      return true;
    }

    return false;
  }
  static updateUserData(totalAnswers, correctAnswers) {
    const score = JSON.parse(localStorage.getItem("userData"));

    score.totalAnswers = Number(score.totalAnswers) + totalAnswers;
    score.correctAnswers = (Number(score.correctAnswers) || 0) + correctAnswers;
    score.totalGamePlayed = score.totalGamePlayed + 1;

    localStorage.setItem("userData", JSON.stringify(score));
  }
  static saveUserData(totalAnswers, correctAnswers) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      ...userData,
      totalAnswers: totalAnswers,
      correctAnswers: correctAnswers,
      totalGamePlayed: 1,
    };

    localStorage.setItem("userData", JSON.stringify(data));
    return true;
  }
  static removeQuestionsList() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const newUserData = {
      ...userData,
      questionsList: [],
    };
    localStorage.setItem("userData", JSON.stringify(newUserData));
    return true;
  }
  static userDataExists() {
    return localStorage.getItem("userData") !== null;
  }
  static getAppState() {
    if (!this.userDataExists()) {
      return false;
    }
    const userData = JSON.parse(localStorage.getItem("userData"));
    return { isPlaying: userData.isPlaying, playLatter: userData.playLatter };
  }
  static getUserData() {
    if (!this.userDataExists()) {
      return false;
    }
    return JSON.parse(localStorage.getItem("userData"));
  }
}

export default LocalStorageManager;
