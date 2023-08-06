import React from "react";
import "./Statistics.css";
import LocalStorageManager from "../../Api/LocalStorageManager";

function Statistics() {
  let totalAnswers;
  let correctAnswers;
  let totalGamePlayed;
  if (LocalStorageManager.userScoreExists()) {
    const playerHistory = LocalStorageManager.getUserScore();
    totalAnswers = playerHistory.totalAnswers;
    correctAnswers = playerHistory.correctAnswers;
    totalGamePlayed = playerHistory.totalGamePlayed;
  }
  const wrongAnswersPercentage = totalAnswers
    ? Math.floor(((totalAnswers - correctAnswers) / totalAnswers) * 100)
    : 0;
  const correctAnswersPercentage = totalAnswers
    ? Math.floor((correctAnswers / totalAnswers) * 100)
    : 0;
  return (
    <div className="statistics">
      <h2>Your Statistics</h2>
      {/* <div> */}
      {/* <p>Number of games played : {gamesPlayed} </p>: */}
      <ul>
        <li>
          Games played : <span>{totalGamePlayed}</span>
        </li>
        <li>
          Questions answered : <span>{totalAnswers}</span>
        </li>
        <li>
          Good answers: <span>{correctAnswers}</span>
        </li>
        <li>
          Percentage of good answers : <span>{correctAnswersPercentage} %</span>
        </li>
      </ul>
      {/* </div> */}
    </div>
  );
}

export default Statistics;
