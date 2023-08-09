import { useState } from "react";
import { decode } from "../../utils/utils";
import "./question.css";
function Question({
  question,
  correct_answer,
  answers,
  listAllUserAnswers,
  groupeId,
}) {
  const [selectedOption, setSelectedOption] = useState("");

  function handleOptionChange(event) {
    setSelectedOption(event.target.value);
    listAllUserAnswers(
      event.target.name,
      event.target.value,
      event.target.dataset.answers
    );
  }

  const radioElements = answers.map((option, index) => {
    const key = `${option}-${index}`;
    return (
      <div key={key} className="answer">
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

  const selectedStyle =
    selectedOption !== ""
      ? {
          borderRight: "2px solid #b8c4ff",

          borderBottom: "2px solid #b8c4ff",
          boxShadow: "0px 2px 2px 0 #b8c4ff",
        }
      : {};

  return (
    <div>
      <h4 className="subtitle" data-testid="title">
        {decode(question)}
      </h4>
      <div className="answers-container" style={selectedStyle}>
        {radioElements}
      </div>
    </div>
  );
}

export default Question;
