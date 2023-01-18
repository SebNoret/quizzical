function Game({ startGame }) {
  return (
    <>
      <h1 className="title">Quzzical</h1>
      <p className="paragraph">A questions game to test your Knwledge.</p>
      <div className="btn-container">
        <button onClick={() => startGame()} className="btn">
          Start
        </button>
      </div>
    </>
  );
}

export default Game;
