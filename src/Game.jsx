function Game({ startGame }) {
  return (
    <div className="game">
      <h1>Quzzical</h1>
      <p>A questions game to test your Knwledge.</p>
      <button onClick={() => startGame()}>Start</button>
    </div>
  );
}

export default Game;
