import React from "react";
import "./Statistics.css";
import LocalStorageManager from "../../Api/LocalStorageManager";

function Statistics() {
  let totalAnswers;
  let correctAnswers;
  if (LocalStorageManager.userScoreExists()) {
    const playerHistory = LocalStorageManager.getUserScore();
    totalAnswers = playerHistory.totalAnswers;
    correctAnswers = playerHistory.correctAnswers;
  }
  return (
    <div className="statistics">
      <h2>Your Statistics :</h2>
      <div>
        {/* <p>Number of games played : {gamesPlayed} </p>: */}
        <p>Number of questions answered : {totalAnswers} </p>
        <p>Number of good answers: {correctAnswers} </p>
        <p>Number of wrong answers : {totalAnswers - correctAnswers}</p>
      </div>
    </div>
  );
}

export default Statistics;
