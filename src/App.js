import React, { useState, useEffect } from "react";

import "./app.css";
import StartPage from "./components/pages/StartPage";
import GamePage from "./components/pages/GamePage";
import data from "./data";

const App = (props) => {
  const [playingGame, setPlayingGame] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions(data.results);
  }, []);

  return (
    <>
      {playingGame ? (
        <GamePage game={{ questions }} />
      ) : (
        <StartPage game={{ setPlayingGame }} />
      )}
    </>
  );
};

export default App;
