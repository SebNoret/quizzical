import LocalStorageManager from "../../Api/LocalStorageManager";
function Game({ startGame, continueGame }) {
  return (
    <div className="app-presentation">
      <h1 className="title">Quizzical</h1>
      <p className="paragraph">Test your knowledge with this game!</p>
      <div className="btn-container">
        {LocalStorageManager.userScoreExists() ? (
          <button onClick={() => continueGame()} className="btn">
            Continue
          </button>
        ) : null}
        <button onClick={() => startGame()} className="btn">
          New Game
        </button>
      </div>
    </div>
  );
}

export default Game;
