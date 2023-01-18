function Result({ score, playAgain, scoreDetails }) {
  const detailsElements = scoreDetails.map((detail, index) => {
    return (
      <div key={index}>
        <h3>{detail.question}</h3>
        <ul>
          {detail.answers.map((answer, index) => {
            return (
              <li
                key={index}
                style={
                  // answer === detail.userAnswer &&
                  // answer === detail.correctAnswer ?
                  { color: "green" }
                  // : { backgroudColor: "red" }
                }
              >
                {answer}
              </li>
            );
          })}
        </ul>
      </div>
    );
  });
  return (
    <div className="result">
      <h2>Results</h2>
      {detailsElements}
      <p>Score: {score.correct} / 5</p>
      <button onClick={() => playAgain()}>Play again</button>
    </div>
  );
}
export default Result;
