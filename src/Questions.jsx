import { shuffleArray } from "./utils";
import { useEffect, useState } from "react";
import Result from "./Result";
import Question from "./Question";

function Questions() {
  const [checkUserAnswer, setCheckUserAnswer] = useState(false);

  const [apiData, setApiData] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);

  const [score, setScore] = useState({});
  const [scoreDetails, setScoreDetails] = useState([]);
  function apiCall() {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => {
        setApiData(data.results);
      });
  }
  // fetch data from API
  useEffect(() => {
    apiCall();
  }, []);
  useEffect(() => {
    getQuestionList(questionList);
  }, [apiData]);
  // crete correct answers list
  useEffect(() => {
    getCorrectAnswers(correctAnswers);
  }, [questionList]);

  // create questions list
  function getQuestionList() {
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
  function getCorrectAnswers() {
    const correctAnswers = questionList.map((question, index) => {
      return { id: index, correctAnswoer: question.correctAnswer };
    });
    setCorrectAnswers(correctAnswers);
  }

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

  function verifiyUserAnswers() {
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
    return;
  }
  function playAgain() {
    setCheckUserAnswer(false);
    setUserAnswers([]);
    setQuestionList([]);
    apiCall();
  }
  /**
   * @todo add play later function
   */
  // function playLater() {
  //   setCheckUserAnswer(false);
  //   setUserAnswers([]);
  //   setQuestionList([]);
  // }
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
      {checkUserAnswer === false ? (
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

export default Questions;
