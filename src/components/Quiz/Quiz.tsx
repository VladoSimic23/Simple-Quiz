import React, { useState } from "react";
import QuizResults from "../QuizResults/QuizResults";
import QuizQuestion from "../QuizQuestions/QuizQuestions";
import QuizControls from "../QuizControls/QuizControls";
import styles from "../../GlobalStyles/index.module.css";
import useFirebaseData from "../useFirebaseData";

// interface for QuizData to define the type of data we expect
export interface QuizData {
  id: number;
  pitanje: string;
  odgovori: { id: number; odgovor: string }[];
  točniOdgovori: { id: number; točan: boolean }[];
  vrijednost: number;
  image?: string;
}

const Quiz: React.FC = () => {
  // state variables to keep track of the current question, selected answers, score,
  // whether the quiz is finished, answered questions, and firebase data
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: boolean;
  }>({});
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const { firebaseData, firebaseError, firebaseLoading } = useFirebaseData();

  // function to handle selecting an answer
  const handleAnswerSelection = (answerId: number) => {
    setSelectedAnswers((prevAnswers) => {
      return { ...prevAnswers, [answerId]: !prevAnswers[answerId] };
    });
  };

  const handleNextQuestion = () => {
    const currentQuestionData = firebaseData[currentQuestion];
    let selectedCorrectAnswers = 0;
    // Loop through selected answers
    for (const answerId in selectedAnswers) {
      // Check if selected answer is correct
      if (
        currentQuestionData.točniOdgovori.some(
          (answer) =>
            // Compare answer id and check if it's correct and selected
            Number(answerId) === Number(answer.id) &&
            answer.točan &&
            selectedAnswers[answerId]
        )
      ) {
        // Increment the count of selected correct answers
        selectedCorrectAnswers++;
      }
    }

    // check if the correct answers have been selected and update score if necessary
    if (
      selectedCorrectAnswers ===
        currentQuestionData.točniOdgovori.filter((answer) => answer.točan)
          .length &&
      !answeredQuestions.includes(currentQuestion)
    ) {
      setScore((prevScore) => prevScore + currentQuestionData.vrijednost);
      setAnsweredQuestions((prevAnsweredQuestions) => [
        ...prevAnsweredQuestions,
        currentQuestion,
      ]);
    }
    // if the last question has been answered, set quizFinished to true, otherwise move to the next question
    if (currentQuestion === firebaseData.length - 1) {
      setQuizFinished(true);
    } else {
      setSelectedAnswers({});
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  // if loading is true render a Loading screen
  if (firebaseLoading) {
    return <h1>Loading...</h1>;
  }
  //if there is an error fetching firebase document renders a Error
  if (firebaseError) {
    return <h1>{firebaseError}</h1>;
  }

  return (
    <div className={styles.quizWrap}>
      {/*if quiz is finished renders a Quiz Results component*/}
      {quizFinished ? (
        <div className={styles.quizResultsContainer}>
          <QuizResults
            score={score}
            quizData={firebaseData}
            answeredQuestions={answeredQuestions}
            selectedAnswers={selectedAnswers}
          />
        </div>
      ) : (
        <>
          {/*if quiz is started renders a Quiz Question component*/}
          <QuizQuestion
            currentQuestionData={firebaseData[currentQuestion]}
            selectedAnswers={selectedAnswers}
            handleAnswerSelection={handleAnswerSelection}
          />
          <QuizControls handleNextQuestion={handleNextQuestion} />
        </>
      )}
    </div>
  );
};

export default Quiz;
