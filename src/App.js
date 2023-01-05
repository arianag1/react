import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

import "./app.css";
import StartPage from "./components/pages/StartPage";
import GamePage from "./components/pages/GamePage";

const App = (props) => {
  const [startGame, setStartGame] = useState(false);
  const [playingGame, setPlayingGame] = useState(false);
  //State to handle when game is loading
  // const [loadingNewGame, setLoadingNewGame] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [checkAnswers, setCheckAnswers] = useState(false);

  useEffect(() => {
    if (playingGame) {
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then((res) => res.json())
        .then((data) => {
          const allQuestions = data.results.map((question) => ({
            id: nanoid(),
            question: question.question,
            correctAnswer: question.correct_answer,
            answers: retrieveQuestionAnswers(question),
            chosenAnswer: "",
          }));
          setQuestions(allQuestions);
          //Set timeout for game. Add loading to screen to inform user
          //game is loading
          // setTimeout(() => setQuestions(allQuestions), 2000);
        });
    }
  }, [playingGame]);

  const retrieveQuestionAnswers = (question) => {
    //Retrieve all of the incorrect answers and store them in an array
    const answers = [...question.incorrect_answers];

    //Once that's done use math.random to pick a random position in the array
    //and add the correct answer to that position in the array
    const postionInArray = Math.floor(Math.random() * answers.length);
    answers.splice(postionInArray, 0, question.correct_answer);

    //return new array
    return answers;
  };

  //Funcion will be passed down in props to Question component.
  //Function takes the id of the question that an answer is chosen for,
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
