import Question from "../Question/Question";

import "./questionsList.css";

function QuestionsList({
  questionsList,
  listAllUserAnswers,
  verifiyUserAnswers,
  cancel,
  hasMissingAnswer,
}) {
  const questionElements = questionsList.map((question, index) => {
    const key = `${question.question} - ${index}`;
    return (
      <Question
        key={key}
        question={question.question}
        correct_answer={question.correctAnswer}
        answers={question.answers}
        groupeId={index}
        listAllUserAnswers={listAllUserAnswers}
        hasMissingAnswers={hasMissingAnswer}
      />
    );
  });

  return (
    <div className="questions-list">
      <h1 className="title">Questions: </h1>
      {questionElements}
      <div className="btn-container">
        <button className="btn" onClick={() => cancel()}>
          Cancel game
        </button>

        <button onClick={() => verifiyUserAnswers()} className="btn">
          Check answers
        </button>
      </div>
    </div>
  );
}

export default QuestionsList;
