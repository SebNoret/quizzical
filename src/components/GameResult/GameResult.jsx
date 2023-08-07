import LocalStorageManager from "../../Api/LocalStorageManager";
import { decode } from "../../utils/utils";

import "./gameResult.css";

function GameResult({
  score,
  scoreDetails,
  playAgain,
  startNewGame,
  playLater,
}) {
  const listOfAnswers = LocalStorageManager.hasUserAnswsersSaved()
    ? LocalStorageManager.getScoreDetails()
    : scoreDetails;
  const lastScore = LocalStorageManager.hasLastScoreSaved()
    ? LocalStorageManager.getLastScore()
    : score;
  const detailAnswsersElements = listOfAnswers.map((detail, index) => {
    const key = `${detail.id}-${detail.question}-${index}`;
    return (
      <div key={key}>
        <h4 className="subtitle">{decode(detail.question)}</h4>
        <div key={key} className="answers-container">
          {detail.answers.map((option, index) => {
            const key = `${detail.id}-${option}-${index}`;

            return (
              <div className="answer" key={key}>
                <div
                  className={
                    option === detail.correctAnswer
                      ? "radio-label good-answer"
                      : option === detail.userAnswer &&
                        option !== detail.correctAnswer
                      ? "radio-label wrong-answer"
                      : "radio-label-result"
                  }
                >
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
      {detailAnswsersElements}
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
