import { decode } from "./utils";

function Result({ score, playAgain, scoreDetails }) {
  const detailAnswsersElements = scoreDetails.map((detail, index) => {
    return (
      <div key={index}>
        <h4>{decode(detail.question)}</h4>

        {detail.answers.map((option, index) => {
          return (
            <div
              key={index}
              className={
                option === detail.correctAnswer
                  ? "good-answer"
                  : option === detail.userAnswer &&
                    option !== detail.correctAnswer
                  ? "wrong-answer"
                  : null
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
