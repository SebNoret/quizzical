import { useEffect, useState } from "react";
import { decode } from "../../utils/utils";
import "./question.css";
function Question({
  question,
  correct_answer,
  answers,
  listAllUserAnswers,
  groupeId,
  handleSelectedOptionsList,
}) {
  const [selectedOption, setSelectedOption] = useState("");
  //test
  // useEffect(() => {

  // }, [selectedOption]);

  function handleOptionChange(event) {
    setSelectedOption(event.target.value);
    listAllUserAnswers(
      event.target.name,
      event.target.value,
      event.target.dataset.answers
    );
  }

  const radioElements = answers.map((option, index) => {
    return (
      <div key={index} className="answer">
        <label
          className={
            selectedOption === option ? "radio-label selected" : "radio-label"
          }
        >
          <input
            type="radio"
            name={groupeId}
            value={option}
            onChange={handleOptionChange}
            data-answers={correct_answer === option ? "correct" : "incorrect"}
            className="radio-btn"
          />
          {decode(option)}
        </label>
      </div>
    );
  });
  return (
    <div>
      <h4 className="subtitle" data-testid="title">
        {decode(question)}
      </h4>
      <div className="answers-container">{radioElements}</div>
    </div>
  );
}

export default Question;
