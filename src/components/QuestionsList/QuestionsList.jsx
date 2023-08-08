import { useEffect, useState } from "react";
import Question from "../Question/Question";

import "./questionsList.css";

function QuestionsList({
  questionsList,
  listAllUserAnswers,
  verifiyUserAnswers,
  cancel,
}) {
  // render question elements

  const [selectedOptionsList, setSelectedOptionsList] = useState([]);
  ///test
  // useEffect(() => {
  //   localStorage.setItem(
  //     "selectedOptionsList",
  //     JSON.stringify(selectedOptionsList)
  //   );
  // }, [selectedOptionsList]);

  function handleSelectedOptionsList(option) {
    setSelectedOptionsList([...selectedOptionsList, option]);
  }
  const questionElements = questionsList.map((question, index) => {
    return (
      <Question
        key={index}
        question={question.question}
        correct_answer={question.correctAnswer}
        answers={question.answers}
        groupeId={index}
        listAllUserAnswers={listAllUserAnswers}
        handleSelectedOptionsList={handleSelectedOptionsList}
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
