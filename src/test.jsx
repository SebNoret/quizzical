import { shuffleArray } from "./utils/utils";
import { useEffect, useState } from "react";
import Result from "./components/Result/Result";
import Question from "./components/Question/Question";
import Loader from "./Loader";

function QuestionsList() {
  const [checkUserAnswer, setCheckUserAnswer] = useState(false);

  const [apiError, setApiError] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [questionList, setQuestionList] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);

  const [score, setScore] = useState({});
  const [scoreDetails, setScoreDetails] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  console.log("rendered");

  async function apiCall() {
    setIsLoading(true);
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=15");
      const data = await response.json();
      setApiData(data.results);
      setIsLoading(false);
    } catch (error) {
      console.log("ceci est lerreur catch", error);
      setApiError(true);
      setIsLoading(false);
    }
  }

  // fetch data from API
  useEffect(() => {
    apiCall();
  }, []);

  // create questions list
  useEffect(() => {
    if (apiData) {
      const questions = apiData.map((question) => {
        return {
          question: question.question,
          correctAnswer: question.correct_answer,
          answers: shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer,
          ]),
        };
      });
      setQuestionList(questions);
    }
  }, [apiData]);

  // create correct answers list
  useEffect(() => {
    const correctAnswers = questionList.map((question, index) => {
      return { id: index, correctAnswer: question.correctAnswer };
    });
    setCorrectAnswers(correctAnswers);
  }, [questionList]);

  // verify user answers
  useEffect(() => {
    if (userAnswers.length === questionList.length) {
      setScore(
        userAnswers.reduce(
          (acc, userAnswer) => {
            if (userAnswer.correctAnswer === "correct") {
              acc.correct++;
            } else {
              acc.incorrect++;
            }
            return acc;
          },
          { correct: 0, incorrect: 0 }
        )
      );

      setScoreDetails(() => {
        return questionList.map((question, index) => {
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
    }
  }, [userAnswers, questionList]);

  function pushAnwserToUserAnswers(id, answer, correctAnswer) {
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
  }

  function playAgain() {
    setCheckUserAnswer(false);
    setUserAnswers([]);
    setQuestionList([]);
    setIsLoading(true);
    apiCall();
  }

  const questionElements = questionList.map((question, index) => {
    return (
      <Question
        key={index}
        question={question.question}
        correct_answer={question.correctAnswer}
        answers={question.answers}
        groupeId={index}
        pushAnwserToResponseList={pushAnwserToUserAnswers}
      />
    );
  });

  return (
    <>
      {isLoading === true ? (
        <Loader />
      ) : apiError === true ? (
        <div className="error-message">
          <p>
            Une erreur s'est produite lors de la récupération des données.
            Veuillez réessayer plus tard.
          </p>
        </div>
      ) : checkUserAnswer === false ? (
        <div className="question">
          <h1 className="title">Questions: </h1>
          {questionElements}
          <div className="btn-container">
            <button onClick={() => verifiyUserAnswers()} className="btn">
              Check answers
            </button>
          </div>
        </div>
      ) : (
        <Result
          score={score}
          scoreDetails={scoreDetails}
          playAgain={playAgain}
        />
      )}
    </>
  );
}

export default QuestionsList;
