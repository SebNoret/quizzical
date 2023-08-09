import { useEffect } from "react";
import LocalStorageManager from "../../Api/LocalStorageManager/LocalStorageManager";
import { decode } from "../../utils/utils";

import "./gameResult.css";

function GameResult({
  score,
  scoreDetails,
  playAgain,
  startNewGame,
  playLater,
}) {
  const listOfAnswers =
    LocalStorageManager.scoreDetailsExists() &&
    LocalStorageManager.getScoreDetails().length === 15
      ? LocalStorageManager.getScoreDetails()
      : scoreDetails;

  const lastScore = LocalStorageManager.hasLastScoreSaved()
    ? LocalStorageManager.getLastScore()
    : score;

  const getAnswerClass = (option, detail) => {
    if (option === detail.correctAnswer) {
      return "good-answer";
    } else if (
      option === detail.userAnswer &&
      option !== detail.correctAnswer
    ) {
      return "wrong-answer";
    } else {
      return "radio-label-result";
    }
  };

  useEffect(() => {
    const wrongAnswersElements = document.querySelectorAll(".wrong-answer");
    if (wrongAnswersElements) {
      wrongAnswersElements.forEach((element) => {
        const granParentElement = element.parentNode.parentNode.parentNode;
        const parentElement = element.parentNode.parentNode;
        granParentElement.style.color = "red";

        parentElement.style.borderBottom = "3px solid red";
      });
    }
  }, []);

  const detailAnswersElements = listOfAnswers.map((detail, index) => {
    const key = `${detail.id}-${detail.question}-${index}`;
    return (
      <div key={key} className="right-answers">
        <h4 className="subtitle">{decode(detail.question)}</h4>
        <div key={key} className="answers-container right-answers-container">
          {detail.answers.map((option, index) => {
            const key = `${detail.id}-${option}-${index}`;
            const answerClass = getAnswerClass(option, detail);
            return (
              <div className="answer" key={key}>
                <div className={`radio-label ${answerClass}`}>
                  {decode(option)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  });
  return (
    <div className="result">
      <h1 className="title">Results</h1>
      {detailAnswersElements}
      <div className="score-details">
        <h3>
          You scored {lastScore.correct}/{listOfAnswers.length} correct answers
        </h3>
        <div className="btn-container">
          <button onClick={() => playAgain()} className="btn btn-result">
            Play again
          </button>
          <button className="btn btn-result" onClick={() => playLater()}>
            Play later
          </button>
          <button className="btn btn-result" onClick={() => startNewGame()}>
            Start new game
          </button>
        </div>
      </div>
    </div>
  );
}
export default GameResult;
