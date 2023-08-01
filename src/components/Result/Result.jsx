import { decode } from "../../utils/utils";
// import "../Question/question.css";
import "./result.css";

function Result({ score, playAgain, scoreDetails }) {
  // console.log(scoreDetails);
  const detailAnswsersElements = scoreDetails.map((detail, index) => {
    const key = `${detail.id}-${detail.question}-${index}`;
    return (
      <div key={key}>
        <h4 className="subtitle">{decode(detail.question)}</h4>
        <div key={key} className="answers-container">
          {detail.answers.map((option, index) => {
            const key = `${detail.id}-${option}-${index}`;

            return (
              <div className="answer" key={key}>
                {/* {console.log("cle du composant", key)} */}
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
      <div className="btn-container">
        <h3>
          You scored {score.correct}/{scoreDetails.length} correct answers
        </h3>
        <button onClick={() => playAgain()} className="btn">
          Play again
        </button>
      </div>
    </div>
  );
}
export default Result;
