import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

import "./app.css";
import StartPage from "./components/pages/StartPage";
import GamePage from "./components/pages/GamePage";
import data from "./data";

const App = (props) => {
  const [playingGame, setPlayingGame] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const allQuestionsAsObjects = data.results.map((question) => ({
      id: nanoid(),
      question: question.question,
      answers: retrieveQuestionAnswers(question),
      chosenAnswer: "",
    }));
    setQuestions(allQuestionsAsObjects);
  }, []);

  const retrieveQuestionAnswers = (question) => {
    //Retrieve all of the incorrect answers and store in an array
    const answers = [...question.incorrect_answers];

    //Once that's done use math.random to pick a random position in the array
    //add the correct answer to that position in the array
    const postionInArray = Math.floor(Math.random() * answers.length);
    answers.splice(postionInArray, 0, question.correct_answer);

    //return new array
    return answers;
  };

  //Funcion will be passed down in props to Question component.
  //Function takes the question id that an answer is chosen for,
  //and the chosen answer as an argument to update a question's
  //chosenAnswer property, in the questions array
  const chooseAnswer = (questionId, chosenAnswer) => {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((question) =>
        question.id === questionId
          ? { ...question, chosenAnswer: chosenAnswer }
          : question
      );
    });
  };

  return (
    <>
      {playingGame ? (
        <GamePage questions={questions} chooseAnswer={chooseAnswer} />
      ) : (
        <StartPage game={{ setPlayingGame }} />
      )}
    </>
  );
};

export default App;
