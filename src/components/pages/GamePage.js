import React from "react";
import Question from "../Question";

const GamePage = (props) => {
  //Convert question objects into JSX
  const listOfQuestions = props.game.questions.map((question) => (
    <Question
      key={question.id}
      question={question}
      chooseAnswerClickHandler={props.game.chooseAnswer}
      checkAnswers={props.game.checkAnswers}
    />
  ));

  const checkAnswersClickHandler = () => {
    props.game.setCheckAnswers(true);
    props.game.setPlayingGame(false);
  };
  const playAgainClickHandler = () => {
    props.game.setCheckAnswers(false);
    props.game.setPlayingGame(true);
    props.game.setQuestions([]);
  };
  const calculateQuestionsAnsweredCorrectly = () => {
    let count = 0;
    for (let i = 0; i < props.game.questions.length; i++) {
      let correctAnswer = props.game.questions[i].correctAnswer;
      let chosenAnswer = props.game.questions[i].chosenAnswer;
      if (correctAnswer === chosenAnswer) {
        count++;
      }
    }

    return count;
  };

  const checkAnswersDisplay = () => {
    const display = props.game.checkAnswers ? (
      <div className="question--play-again-container ">
        <p className="question--play-again-description">{`You scored ${calculateQuestionsAnsweredCorrectly()}/${
          props.game.questions.length
        } correct answers`}</p>
        <button className="btn" onClick={playAgainClickHandler}>
          Play again
        </button>
      </div>
    ) : (
      <button className="btn question--btn" onClick={checkAnswersClickHandler}>
        Check answers
      </button>
    );
    return display;
  };

  //Only display results from checkAnswersDisplay, if the list of questions is greater than 0
  return (
    <div className="gamepage--container">
      {listOfQuestions}
      {props.game.questions.length && checkAnswersDisplay()}
    </div>
  );
};

export default GamePage;
