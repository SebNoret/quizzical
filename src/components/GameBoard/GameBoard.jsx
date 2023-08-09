import { shuffleArray } from "../../utils/utils";
import { fetchData } from "../../Api/fetchData";
import { useEffect, useState } from "react";

import LocalStorageManager from "../../Api/LocalStorageManager/LocalStorageManager";

import GameResult from "../GameResult/GameResult";
import Loader from "../Loader/Loader";
import MissingAnswersErrorMessage from "../MissingAnswersErrorMessage/MissingAnswersErrorMessage";
import FetchApiErrorMessage from "../FetchApiErrorMessage/FetchApiErrorMessage";
import QuestionsList from "../QuestionsList/QuestionsList";

function GameBoard({ startNewGame, playLater, cancel }) {
  const [checkUserAnswer, setCheckUserAnswer] = useState(
    LocalStorageManager.scoreDetailsExists()
  );

  const [dataFromApi, setDataFromApi] = useState([]);
  const [questionsList, setQuestionsList] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState({});
  const [scoreDetails, setScoreDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasMissingAnswer, setHasMissingAnswer] = useState(null);

  // 1) fetch data from API
  useEffect(() => {
    if (LocalStorageManager.questionsListExists()) {
      const storedQuestionsList = LocalStorageManager.getQuestionsList();
      setQuestionsList(storedQuestionsList);
      return;
    }
    setIsLoading(true);
    fetchData()
      .then((data) => {
        setDataFromApi(data.results);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  // 2) create the questions list from API data
  useEffect(() => {
    const questionsList = dataFromApi.map((dataItem) => {
      return {
        question: dataItem.question,
        correctAnswer: dataItem.correct_answer,
        answers: shuffleArray([
          ...dataItem.incorrect_answers,
          dataItem.correct_answer,
        ]),
      };
    });

    if (LocalStorageManager.questionsListExists()) {
      return;
    } else {
      setQuestionsList(questionsList);
      LocalStorageManager.saveQuestionsList(questionsList);
    }
  }, [dataFromApi]);

  useEffect(() => {
    if (userAnswers.length === questionsList.length) {
      setHasMissingAnswer(false);
    }
  }, [userAnswers]);

  useEffect(() => {
    if (
      userAnswers.length > 0 &&
      questionsList.length > 0 &&
      userAnswers.length === questionsList.length
    ) {
      LocalStorageManager.saveScoreDetails(scoreDetails);
    }
  }, [scoreDetails]);

  // add user answer to list of user answers
  function listAllUserAnswers(id, answer, correctAnswer) {
    setUserAnswers((prev) => {
      if (prev.length === 0) {
        return [{ id: id, answer: answer, correctAnswer: correctAnswer }];
      } else {
        if (prev.filter((item) => item.id === id).length === 0) {
          return [
            ...prev,
            { id: id, answer: answer, correctAnswer: correctAnswer },
          ];
        } else {
          return prev.map((item) => {
            if (item.id === id) {
              return { id: id, answer: answer, correctAnswer: correctAnswer };
            } else {
              return item;
            }
          });
        }
      }
    });

    // sort user answers by id accending for use in setScoreDetails
    setUserAnswers((prev) => {
      return prev.sort((a, b) => a.id - b.id);
    });
  }

  // verify user answers and calculate score
  function verifiyUserAnswers() {
    if (userAnswers.length === questionsList.length) {
      setHasMissingAnswer(false);
      const newScore = userAnswers.reduce(
        (acc, userAnswer) => {
          if (userAnswer.correctAnswer === "correct") {
            acc.correct++;
          } else {
            acc.incorrect++;
          }
          return acc;
        },
        { correct: 0, incorrect: 0 }
      );
      setScore(newScore);
      // save stats to local storage
      saveScoreToLocalStorage(newScore);
      LocalStorageManager.saveLastScore(newScore);

      setScoreDetails(() => {
        return questionsList.map((question, index) => {
          console.log("question", question);
          console.log("user answer", userAnswers[index]);
          return {
            id: index,
            question: question.question,
            answers: question.answers,
            correctAnswer: question.correctAnswer,
            userAnswer: userAnswers[index].answer,
          };
        });
      });

      setCheckUserAnswer(true);
    } else {
      setHasMissingAnswer(true);
    }
  }
  //helper function to save score to local storage
  function saveScoreToLocalStorage(newScore) {
    if (LocalStorageManager.userScoreExists()) {
      LocalStorageManager.updateUserData(
        questionsList.length,
        newScore.correct
      );
    } else {
      LocalStorageManager.saveUserData(questionsList.length, newScore.correct);
    }
  }
  // reset game and fetch new data
  function playAgain() {
    LocalStorageManager.removeQuestionsList();
    LocalStorageManager.removeScoreDetails();
    setCheckUserAnswer(false);
    setUserAnswers([]);
    setQuestionsList([]);
    setIsLoading(true);

    fetchData().then((data) => {
      setDataFromApi(data.results);
      setIsLoading(false);
    });
  }

  // retry fetching questions if there is an API error
  function retry() {
    setIsLoading(true);
    setIsError(false);
    fetchData()
      .then((data) => {
        setDataFromApi(data.results);
        setIsLoading(false);
        setIsError(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }

  let gameComponent;

  if (isLoading === true) {
    gameComponent = <Loader />;
  } else if (isError === true) {
    gameComponent = <FetchApiErrorMessage retry={retry} />;
  } else if (checkUserAnswer === false) {
    gameComponent = (
      <>
        {hasMissingAnswer && <MissingAnswersErrorMessage />}
        <QuestionsList
          questionsList={questionsList}
          listAllUserAnswers={listAllUserAnswers}
          verifiyUserAnswers={verifiyUserAnswers}
          cancel={cancel}
          hasMissingAnswer={hasMissingAnswer}
        />
      </>
    );
  } else {
    gameComponent = (
      <GameResult
        score={score}
        scoreDetails={scoreDetails}
        playAgain={playAgain}
        startNewGame={startNewGame}
        playLater={playLater}
      />
    );
  }

  return <>{gameComponent}</>;
}

export default GameBoard;
