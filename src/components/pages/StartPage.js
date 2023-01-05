import React from "react";

const StartPage = (props) => {
  const startGameClickHandler = () => {
    props.game.setStartGame(true);
    props.game.setPlayingGame(true);
  };
  return (
    <div className="page--start">
      <h1 className="page--start-title">Quizzical</h1>
      <p className="page--start-subtitle">Some description if needed</p>
      <button className="btn" onClick={startGameClickHandler}>
        Start quiz
      </button>
    </div>
  );
};

export default StartPage;
