import { decode } from "./utils";
import "./question.css";

function Result({ score, playAgain, scoreDetails }) {
  const detailAnswsersElements = scoreDetails.map((detail, index) => {
    return (
      <div key={index} className="question-container">
        <h4 className="subtitle">{decode(detail.question)}</h4>

        {detail.answers.map((option, index) => {
          return (
            <div
              key={index}
              className={
                option === detail.correctAnswer
                  ? "radio-label good-answer"
                  : option === detail.userAnswer &&
                    option !== detail.correctAnswer
                  ? "radio-label wrong-answer"
                  : "radio-label"
              }
            >
              {decode(option)}
            </div>
          );
        })}
      </div>
    );
  });
  return (
    <div className="result">
      <h1 className="title">Results</h1>
      {detailAnswsersElements}
      <p>Score: {score.correct} / 5</p>
      <div className="btn-container">
        <button onClick={() => playAgain()} className="btn">
          Play again
        </button>
      </div>
    </div>
  );
}
export default Result;
