import Question from "../Question/Question";

import "./questionsList.css";

function QuestionsList({
  questionsList,
  pushAnswerToUserAnswers,
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
        pushAnwserToResponseList={pushAnswerToUserAnswers}
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
