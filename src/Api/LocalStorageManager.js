class LocalStorageManager {
  static userDataExists() {
    return localStorage.getItem("userData") !== null;
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
  static getUserData() {
    if (!this.userDataExists()) {
      return false;
    }
    return JSON.parse(localStorage.getItem("userData"));
  }

  static removeUserData() {
    localStorage.removeItem("userData");
    return true;
  }

  static updateUserData(totalAnswers, correctAnswers) {
    const score = JSON.parse(localStorage.getItem("userData"));

    score.totalAnswers = Number(score.totalAnswers) + totalAnswers;
    score.correctAnswers = (Number(score.correctAnswers) || 0) + correctAnswers;
    score.totalGamePlayed = score.totalGamePlayed + 1;

    localStorage.setItem("userData", JSON.stringify(score));
  }

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
      console.log("update state in local storage", newUserData);
      localStorage.setItem("userData", JSON.stringify(newUserData));
      return true;
    }
  }
  static getAppState() {
    if (!this.userDataExists()) {
      return false;
    }
    const userData = JSON.parse(localStorage.getItem("userData"));
    return { isPlaying: userData.isPlaying, playLatter: userData.playLatter };
  }
  /**
   *
   *
   *  questionsList  methods
   *
   */
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
  static saveQuestionsList(questionsList) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const newUserData = {
      ...userData,
      questionsList: questionsList,
    };
    localStorage.setItem("userData", JSON.stringify(newUserData));
    return true;
  }

  static getQuestionsList() {
    if (!this.userDataExists()) {
      return false;
    }
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData.questionsList;
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

  static saveHasPlayed() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const newUserData = {
      ...userData,
      hasPlayed: true,
    };
    localStorage.setItem("userData", JSON.stringify(newUserData));
    return true;
  }
  static getHasPlayed() {
    if (!this.userDataExists()) {
      return false;
    }
    const userData = JSON.parse(localStorage.getItem("userData"));

    return userData.hasPlayed;
  }
  static removeHasPlayed() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    delete userData.hasPlayed;
    localStorage.setItem("userData", JSON.stringify(userData));
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
  static getScoreDetails() {
    if (!this.userDataExists()) {
      return false;
    }
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData.scoreDetails;
  }
  static removeScoreDetails() {
    console.log("remove score details");
    const userData = JSON.parse(localStorage.getItem("userData"));
    delete userData.scoreDetails;
    localStorage.setItem("userData", JSON.stringify(userData));
    return true;
  }
}

export default LocalStorageManager;
