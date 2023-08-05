class LocalStorageManager {
  static userScoreExists() {
    return localStorage.getItem("userScore") !== null;
  }

  static saveUserScore(totalAnswers, correctAnswers) {
    const score = {
      totalAnswers: totalAnswers,
      correctAnswers: correctAnswers,
      totalGamePlayed: 1,
    };
    localStorage.setItem("userScore", JSON.stringify(score));
    return true;
  }
  static getUserScore() {
    if (!this.userScoreExists()) {
      return false;
    }
    return JSON.parse(localStorage.getItem("userScore"));
  }

  static removeUserScore() {
    localStorage.removeItem("userScore");
    return true;
  }

  static updateUserScore(totalAnswers, correctAnswers) {
    const score = JSON.parse(localStorage.getItem("userScore"));
    console.log(score);
    score.totalAnswers = Number(score.totalAnswers) + totalAnswers;
    score.correctAnswers = (Number(score.correctAnswers) || 0) + correctAnswers;
    score.totalGamePlayed = score.totalGamePlayed + 1;
    // localStorage.removeItem("userScore");
    localStorage.setItem("userScore", JSON.stringify(score));
  }
}

export default LocalStorageManager;
