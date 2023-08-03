// import { shuffleArray } from "../../utils/utils";
// import { fetchQuestions } from "../../Api/fetchQuestions";
// import LocalStorageManager from "../../Api/LocalStorageManager";
// import { useEffect, useState } from "react";
// import Result from "../Result/Result";
// import Question from "../Question/Question";
// import Loader from "../Loader/Loader";

// function QuestionsList({ startNewGame, playLater }) {
//   const [checkUserAnswer, setCheckUserAnswer] = useState(false);

//   const [apiData, setApiData] = useState([]);
//   const [questionList, setQuestionList] = useState([]);
//   const [correctAnswers, setCorrectAnswers] = useState([]);
//   const [userAnswers, setUserAnswers] = useState([]);

//   const [score, setScore] = useState({});
//   const [scoreDetails, setScoreDetails] = useState([]);

//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);

//   // fetch data from API
//   useEffect(() => {
//     setIsLoading(true);
//     fetchQuestions()
//       .then((data) => {
//         createQuestionList(data.results);
//         getCorrectAnswers();
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setIsLoading(false);
//         setIsError(true);
//       });
//   }, []);

//   function createQuestionList(apiData) {
//     const questions = apiData.map((question) => {
//       return {
//         question: question.question,
//         correctAnswer: question.correct_answer,
//         answers: shuffleArray([
//           ...question.incorrect_answers,
//           question.correct_answer,
//         ]),
//       };
//     });
//     setQuestionList(questions);
//   }
//   // create questions list
//   function getQuestionList() {
//     const questions = apiData.map((question) => {
//       return {
//         question: question.question,
//         correctAnswer: question.correct_answer,
//         answers: shuffleArray([
//           ...question.incorrect_answers,
//           question.correct_answer,
//         ]),
//       };
//     });
//     setQuestionList(questions);
//   }
//   function getCorrectAnswers() {
//     const correctAnswers = questionList.map((question, index) => {
//       return { id: index, correctAnswer: question.correctAnswer };
//     });
//     setCorrectAnswers(correctAnswers);
//   }

//   function pushAnswerToUserAnswers(id, answer, correctAnswer) {
//     setUserAnswers((prev) => {
//       if (prev.length === 0) {
//         return [{ id: id, answer: answer, correctAnswer: correctAnswer }];
//       } else {
//         if (prev.filter((item) => item.id === id).length === 0) {
//           return [
//             ...prev,
//             { id: id, answer: answer, correctAnswer: correctAnswer },
//           ];
//         } else {
//           return prev.map((item) => {
//             if (item.id === id) {
//               return { id: id, answer: answer, correctAnswer: correctAnswer };
//             } else {
//               return item;
//             }
//           });
//         }
//       }
//     });
//   }

//   function verifiyUserAnswers() {
//     if (userAnswers.length === questionList.length) {
//       const newScore = userAnswers.reduce(
//         (acc, userAnswer) => {
//           if (userAnswer.correctAnswer === "correct") {
//             acc.correct++;
//           } else {
//             acc.incorrect++;
//           }
//           return acc;
//         },
//         { correct: 0, incorrect: 0 }
//       );
//       setScore(newScore);

//       if (LocalStorageManager.userScoreExists()) {
//         LocalStorageManager.updateUserScore(
//           questionList.length,
//           newScore.correct
//         );
//       } else {
//         LocalStorageManager.saveUserScore(
//           questionList.length,
//           newScore.correct
//         );
//       }

//       setScoreDetails(() => {
//         return questionList.map((question, index) => {
//           return {
//             id: index,
//             question: question.question,
//             answers: question.answers,
//             correctAnswer: question.correctAnswer,
//             userAnswer: userAnswers[index].answer,
//           };
//         });
//       });

//       setCheckUserAnswer(true);
//     }
//     return;
//   }
//   function playAgain() {
//     setCheckUserAnswer(false);
//     setUserAnswers([]);
//     setQuestionList([]);
//     setIsLoading(true);

//     fetchQuestions().then((data) => {
//       createQuestionList(data.results);
//       getCorrectAnswers();
//       setIsLoading(false);
//     });
//   }
//   function retry() {
//     setIsLoading(true);
//     setIsError(false);
//     fetchQuestions()
//       .then((data) => {
//         createQuestionList(data.results);
//         getCorrectAnswers();
//         setIsLoading(false);
//         setIsError(false);
//       })
//       .catch(() => {
//         setIsLoading(false);
//         setIsError(true);
//       });
//   }

//   const questionElements = questionList.map((question, index) => {
//     return (
//       <Question
//         key={index}
//         question={question.question}
//         correct_answer={question.correctAnswer}
//         answers={question.answers}
//         groupeId={index}
//         pushAnwserToResponseList={pushAnswerToUserAnswers}
//       />
//     );
//   });

//   return (
//     <>
//       {isLoading === true ? (
//         <Loader />
//       ) : isError === true ? (
//         <div className="error">
//           <h1 className="title">Something went wrong</h1>
//           <p className="text">
//             Please check your internet connection and try again
//           </p>
//           <div className="retry">
//             <button onClick={() => retry()} className="btn">
//               Retry
//             </button>
//           </div>
//         </div>
//       ) : checkUserAnswer === false ? (
//         <div className="question">
//           <h1 className="title">Questions: </h1>
//           {questionElements}
//           <div className="btn-container">
//             <button onClick={() => verifiyUserAnswers()} className="btn">
//               Check answers
//             </button>
//           </div>
//         </div>
//       ) : (
//         <Result
//           score={score}
//           scoreDetails={scoreDetails}
//           playAgain={playAgain}
//           startNewGame={startNewGame}
//           playLater={playLater}
//         />
//       )}
//     </>
//   );
// }

// export default QuestionsList;

function QuestionsList({ startNewGame, playLater }) {
  const [checkUserAnswer, setCheckUserAnswer] = useState(false);

  const [questionsFromApi, setQuestionsFromApi] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);

  const [score, setScore] = useState({});
  const [scoreDetails, setScoreDetails] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // fetch data from API
  useEffect(() => {
    setIsLoading(true);
    fetchQuestions()
      .then((data) => {
        setQuestionsFromApi(data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  // create questions list from API data
  useEffect(() => {
    const questions = questionsFromApi.map((question) => {
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
  }, [questionsFromApi]);

  // create list of correct answers
  useEffect(() => {
    const correctAnswers = questionList.map((question, index) => {
      return { id: index, correctAnswer: question.correctAnswer };
    });
    setCorrectAnswers(correctAnswers);
  }, [questionList]);

  // add user answer to list of user answers
  function pushAnswerToUserAnswers(id, answer, correctAnswer) {
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

  // verify user answers and calculate score
  function verifiyUserAnswers() {
    if (userAnswers.length === questionList.length) {
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

      if (LocalStorageManager.userScoreExists()) {
        LocalStorageManager.updateUserScore(
          questionList.length,
          newScore.correct
        );
      } else {
        LocalStorageManager.saveUserScore(
          questionList.length,
          newScore.correct
        );
      }

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

  // reset game and fetch new questions
  function playAgain() {
    setCheckUserAnswer(false);
    setUserAnswers([]);
    setQuestionList([]);
    setIsLoading(true);

    fetchQuestions().then((data) => {
      setQuestionsFromApi(data.results);
      setIsLoading(false);
    });
  }

  // retry fetching questions
  function retry() {
    setIsLoading(true);
    setIsError(false);
    fetchQuestions()
      .then((data) => {
        setQuestionsFromApi(data.results);
        setIsLoading(false);
        setIsError(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }

  // render question elements
  const questionElements = questionList.map((question, index) => {
    return (
      <Question
        key={index}
        question={question.question}
        correct_answer={question.correctAnswer}
        answers={question.answers}
        groupeId={index}
        pushAnwserToResponseList={pushAnswerToUserAnswers}
      />
    );
  });

  return (
    <>
      {isLoading === true ? (
        <Loader />
      ) : isError === true ? (
        <div className="error">
          <h1 className="title">Something went wrong</h1>
          <p className="text">
            Please check your internet connection and try again
          </p>
          <div className="retry">
            <button onClick={() => retry()} className="btn">
              Retry
            </button>
          </div>
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
          startNewGame={startNewGame}
          playLater={playLater}
        />
      )}
    </>
  );
}
