import React from "react";
import Question from "../Question";

const GamePage = (props) => {
  //Convert question objects into JSX
  const listOfQuestions = props.questions.map((question) => (
    <Question
      key={question.id}
      question={question}
      chooseAnswerClickHandler={props.chooseAnswer}
    />
  ));

  return (
    <div className="gamepage--container">
      {listOfQuestions}
      <button className="btn question--btn">Check Answers</button>
    </div>
  );
};

export default GamePage;
