import React, { useEffect } from "react";
import { decode } from "./utils";
function Question({
  question,
  correct_answer,
  answers,
  pushAnwserToResponseList,
  groupeId,
}) {
  const [selectedOption, setSelectedOption] = React.useState("");

  function handleOptionChange(event) {
    setSelectedOption(event.target.value);
    pushAnwserToResponseList(
      event.target.name,
      event.target.value,
      event.target.dataset.answers
    );
  }

  const radioElements = answers.map((option, index) => {
    return (
      <div key={index}>
        <label className={selectedOption === option ? "selected" : null}>
          <input
            type="radio"
            name={groupeId}
            value={option}
            onChange={handleOptionChange}
            data-answers={correct_answer === option ? "correct" : "incorrect"}
          />
          {decode(option)}
          {correct_answer === option && (
            <span style={{ color: "red", fontWeight: "bold" }}> Correct</span>
          )}
        </label>
      </div>
    );
  });
  return (
    <div data-testid="Question">
      <h3 data-testid="title">{decode(question)}</h3>
      <div>
        {radioElements}
        {/* {selectedOption && <p>You selected {selectedOption}</p>} */}
      </div>
    </div>
  );
}

export default Question;
