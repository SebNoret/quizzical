import React from "react";
import "./Statistics.css";
import LocalStorageManager from "../../Api/LocalStorageManager/LocalStorageManager";

function Statistics() {
  let totalAnswers;
  let correctAnswers;
  let totalGamePlayed;
  if (LocalStorageManager.getStorage()) {
    const playerHistory = LocalStorageManager.getStorage();
    totalAnswers = playerHistory.totalAnswers;
    correctAnswers = playerHistory.correctAnswers;
    totalGamePlayed = playerHistory.totalGamePlayed;
  }

  const correctAnswersPercentage = totalAnswers
    ? Math.floor((correctAnswers / totalAnswers) * 100)
    : 0;
  return (
    <div className="statistics">
      <h2>Your Statistics</h2>

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
    </div>
  );
}

export default Statistics;
