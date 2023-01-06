import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

import "./app.css";
import StartPage from "./components/pages/StartPage";
import GamePage from "./components/pages/GamePage";

const App = (props) => {
  const [startGame, setStartGame] = useState(false);
  const [playingGame, setPlayingGame] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [checkAnswers, setCheckAnswers] = useState(false);

  useEffect(() => {
    if (playingGame) {
      fetch("https://opentdb.com/api.php?amount=5&type=multiple&encode=url3986")
        .then((res) => res.json())
        .then((data) => {
          const allQuestions = data.results.map((question) => ({
            id: nanoid(),
            question: decodeURIComponent(question.question),
            correctAnswer: decodeURIComponent(question.correct_answer),
            answers: retrieveQuestionAnswers(question),
            chosenAnswer: "",
          }));
          setQuestions(allQuestions);
        });
    }
  }, [playingGame]);

  const retrieveQuestionAnswers = (question) => {
    //Retrieve all of the incorrect answers, decode them and store them in the answers array
    const answers = question.incorrect_answers.map((answer) => ({
      id: nanoid(),
      value: decodeURIComponent(answer),
    }));

    //after answers have been added to answer array, pick a random position in the array.
    //Decode the correct answer string and then add it to the chosen random position in
    //the array.
    const postionInArray = Math.floor(Math.random() * answers.length);
    answers.splice(postionInArray, 0, {
      id: nanoid(),
      value: decodeURIComponent(question.correct_answer),
    });

    //return new array of answers that contain both incorrect answers and the correct answer
    return answers;
  };

  //Funcion will be passed down in props to Question component.
  //Function takes the id of the question that an answer is chosen for,
  //and the chosen answer as an argument to update a question's
  //chosenAnswer property, in the questions array, but only while game is being
  //played (i.e "checkAnswers" is set to false)
  const chooseAnswer = (questionId, chosenAnswer) => {
    if (!checkAnswers) {
      setQuestions((prevQuestions) => {
        return prevQuestions.map((question) =>
          question.id === questionId
            ? { ...question, chosenAnswer: chosenAnswer }
            : question
        );
      });
    }
  };

  return (
    <>
      {startGame ? (
        <GamePage
          game={{
            questions,
            chooseAnswer,
            checkAnswers,
            setCheckAnswers,
            setPlayingGame,
            setQuestions,
          }}
        />
      ) : (
        <StartPage game={{ setStartGame, setPlayingGame }} />
      )}
    </>
  );
};

export default App;
