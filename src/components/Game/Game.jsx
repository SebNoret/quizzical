function Game({ startGame }) {
  return (
    <div className="app-presentation">
      <h1 className="title">Quizzical</h1>
      <p className="paragraph">Test your knowledge with this game!</p>
      <div className="btn-container">
        <button onClick={() => startGame()} className="btn">
          Start
        </button>
      </div>
    </div>
  );
}

export default Game;
