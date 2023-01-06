import React from "react";

import Answer from "./Answer";

const Question = (props) => {
  const answerOptions = props.question.answers.map((answer) => (
    <Answer
      key={answer.id}
      value={answer.value}
      wasChosen={answer.value === props.question.chosenAnswer}
      isCorrect={answer.value === props.question.correctAnswer}
      gameIsOver={props.checkingAnswers}
      chooseAnswerClickHandler={() => {
        props.chooseAnswer(props.question.id, answer.value);
      }}
    />
  ));
  //Create p JSX elements for each answer in the answers array,
  //if current answer option, is the current answer, set it's
  //className to question--correct-answer

  return (
    <div className="question--container">
      <h2 className="question--title">{props.question.question}</h2>
      <div className="question--answers-container">{answerOptions}</div>
    </div>
  );
};

export default Question;
