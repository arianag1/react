import React from "react";
import { nanoid } from "nanoid";

const Question = (props) => {
  //Create p JSX elements for each answer in the answers array,
  //if current answer option, is the current answer, set it's
  //className to question--correct-answer
  const answerOptions = props.question.answers.map((answer) => {
    let className = "question--answer";
    const correctAnswer = props.question.correctAnswer;
    const chosenAnswer = props.question.chosenAnswer;

    if (props.checkAnswers) {
      if (answer === chosenAnswer && answer === correctAnswer) {
        className = `${className} question--chosen-answer-correct`;
      } else if (answer === chosenAnswer && answer !== correctAnswer) {
        className = `${className} question--chosen-answer-incorrect`;
      } else if (answer !== chosenAnswer && answer === correctAnswer) {
        className = `${className} question--chosen-answer-correct`;
      }
    } else if (answer === props.question.chosenAnswer) {
      className = `${className} question--chosen-answer`;
    }

    return (
      <p
        key={nanoid()}
        className={className}
        onClick={() => {
          props.chooseAnswerClickHandler(props.question.id, answer);
        }}
      >
        {answer}
      </p>
    );
  });

  return (
    <div className="question--container">
      <h2 className="question--title">{props.question.question}</h2>
      <div className="question--answers-container">{answerOptions}</div>
    </div>
  );
};

export default Question;
