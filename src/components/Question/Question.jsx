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
          {/* {correct_answer === option && (
            <span style={{ color: "red", fontWeight: "bold" }}> Correct</span>
          )} */}
        </label>
      </div>
    );
  });
  return (
    <div>
      <h4 className="subtitle" data-testid="title">
        {decode(question)}
      </h4>
      <div className="answers-container">
        {radioElements}
        {/* {selectedOption && <p>You selected {selectedOption}</p>} */}
      </div>
    </div>
  );
}

export default Question;
