import "./missingAnswersErrorMessage.css";

function MissingAnswersErrorMessage() {
  return (
    <div className="error-message">
      <p className="text">
        Please answer all questions before checking your answers.
      </p>
    </div>
  );
}

export default MissingAnswersErrorMessage;
