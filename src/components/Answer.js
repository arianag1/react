import React from "react";

const Answer = (props) => {
  const getAnswerClassName = () => {
    const isCorrect = props.isCorrect;
    const wasChosen = props.wasChosen;
    const gameIsOver = props.gameIsOver;
    const answer = props.value;
    const defaultClassName = "question--answer";

    if (gameIsOver) {
      if (wasChosen && isCorrect) {
        return `${defaultClassName} question--chosen-answer-correct`;
      } else if (wasChosen && !isCorrect) {
        return `${defaultClassName} question--chosen-answer-incorrect`;
      } else if (!wasChosen && isCorrect) {
        return `${defaultClassName} question--chosen-answer-correct`;
      }
    } else if (!gameIsOver && wasChosen) {
      return `${defaultClassName} question--chosen-answer`;
    }

    return defaultClassName;
  };

  return (
    <p
      className={getAnswerClassName(props.answer)}
      onClick={props.chooseAnswerClickHandler}
    >
      {props.value}
    </p>
  );
};

export default Answer;
