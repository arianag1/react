import React from "react";

const StartPage = (props) => {
  return (
    <div className="page--start">
      <h1 className="page--start-title">Quizzical</h1>
      <p className="page--start-subtitle">Some description if needed</p>
      <button className="btn" onClick={() => props.game.setPlayingGame(true)}>
        Start quiz
      </button>
    </div>
  );
};

export default StartPage;
