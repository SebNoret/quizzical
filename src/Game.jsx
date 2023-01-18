function Game({ startGame }) {
  return (
    <div className="game">
      <h1 className="title">Quzzical</h1>
      <p>A questions game to test your Knwledge.</p>
      <div className="btn-container">
        <button onClick={() => startGame()} className="btn">
          Start
        </button>
      </div>
    </div>
  );
}

export default Game;
