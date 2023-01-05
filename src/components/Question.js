import React from "react";

const Question = (props) => {
  const retrieveQuestionAnswers = () => {
    //Retrieve all of the incorrect answers and store in an array
    const answers = [...props.question.incorrect_answers];

    //Once that's done use math.random to pick a random position in the array
    //add the correct answer to that position in the array
    const postionInArray = Math.floor(Math.random() * answers.length);
    answers.splice(postionInArray, 0, props.question.correct_answer);

    //return new array
    return answers;
  };

  const chooseAnswer = (answer) => {
    console.log(answer);
  };

  //Create p JSX elements for each answer in the answers array,
  //if current answer option, is the current answer, set it's
  //className to question--correct-answer
  const answerOptions = retrieveQuestionAnswers().map((answer) => (
    <p
      className="question--answer"
      onClick={() => {
        chooseAnswer(answer);
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
