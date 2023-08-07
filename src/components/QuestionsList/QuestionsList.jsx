import Question from "../Question/Question";

import "./questionsList.css";

function QuestionsList({
  questionsList,
  listAllUserAnswers,
  verifiyUserAnswers,
}) {
  // render question elements
  const questionElements = questionsList.map((question, index) => {
    return (
      <Question
        key={index}
        question={question.question}
        correct_answer={question.correctAnswer}
        answers={question.answers}
        groupeId={index}
        listAllUserAnswers={listAllUserAnswers}
      />
    );
  });

  return (
    <div className="questions-list">
      <h1 className="title">Questions: </h1>
      {questionElements}
      <div className="btn-container">
        {}
        <button onClick={() => verifiyUserAnswers()} className="btn">
          Check answers
        </button>
      </div>
    </div>
  );
}

export default QuestionsList;
