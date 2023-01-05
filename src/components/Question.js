import React from "react";
import { nanoid } from "nanoid";

const Question = (props) => {
  const chooseAnswer = (answer) => {
    console.log(answer);
  };

  //Create p JSX elements for each answer in the answers array,
  //if current answer option, is the current answer, set it's
  //className to question--correct-answer
  const answerOptions = props.question.answers.map((answer) => (
    <p
      key={nanoid()}
      className={`question--answer ${
        props.question.chosenAnswer === answer && "question--chosen-answer"
      }`}
      onClick={() => {
        props.chooseAnswerClickHandler(props.question.id, answer);
      }}
    >
      {answer}
    </p>
  ));

  return (
    <div className="question--container">
      <h2 className="question--title">{props.question.question}</h2>
      <div className="question--answers-container">{answerOptions}</div>
    </div>
  );
};

export default Question;
