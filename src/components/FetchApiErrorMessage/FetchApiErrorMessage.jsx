import "./fetchApiErrorMessage.css";
function FetchApiErrorMessage({ retry }) {
  return (
    <div>
      <h1 className="title">Something went wrong</h1>
      <p>Please check your internet connection and try again</p>
      <div className="retry">
        <button onClick={() => retry()} className="btn">
          Retry
        </button>
      </div>
    </div>
  );
}

export default FetchApiErrorMessage;
