import React from "react";
import Question from "../Question";

const GamePage = (props) => {
  const questions = props.game.questions;
  const listOfQuestions = questions.map((question) => (
    <Question question={question} />
  ));

  return (
    <div className="gamepage--container">
      {listOfQuestions}
      <button class="btn question--btn">Check Answers</button>
    </div>
  );
};

export default GamePage;
