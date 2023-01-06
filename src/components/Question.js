import React from "react";
import { nanoid } from "nanoid";

const Question = (props) => {
  const getAnswerClassName = (answer) => {
    const correctAnswer = props.question.correctAnswer;
    const chosenAnswer = props.question.chosenAnswer;
    const checkingAnswers = props.checkAnswers;
    const defaultClassName = "question--answer";

    if (checkingAnswers) {
      if (answer === chosenAnswer && answer === correctAnswer) {
        return `${defaultClassName} question--chosen-answer-correct`;
      } else if (answer === chosenAnswer && answer !== correctAnswer) {
        return `${defaultClassName} question--chosen-answer-incorrect`;
      } else if (answer !== chosenAnswer && answer === correctAnswer) {
        return `${defaultClassName} question--chosen-answer-correct`;
      }
    } else if (!checkingAnswers && answer === chosenAnswer) {
      return `${defaultClassName} question--chosen-answer`;
    }

    return defaultClassName;
  };
  //Create p JSX elements for each answer in the answers array,
  //if current answer option, is the current answer, set it's
  //className to question--correct-answer
  const answerOptions = props.question.answers.map((answer) => (
    <p
      key={nanoid()}
      className={getAnswerClassName(answer)}
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
