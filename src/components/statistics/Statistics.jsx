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
  const wrongAnswersPercentage = totalAnswers
    ? Math.floor(((totalAnswers - correctAnswers) / totalAnswers) * 100)
    : 0;
  return (
    <div className="statistics">
      <h2>Your Statistics :</h2>
      <div>
        {/* <p>Number of games played : {gamesPlayed} </p>: */}
        <ul>
          <li>Games played : {}</li>
          <li>Questions answered : {totalAnswers} </li>
          <li>Good answers: {correctAnswers} </li>
          <li> Wrong answers percentage: {wrongAnswersPercentage} %</li>
        </ul>
      </div>
    </div>
  );
}

export default Statistics;
