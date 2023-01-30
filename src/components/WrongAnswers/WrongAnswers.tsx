import React from "react";
import { QuizData } from "../Quiz/Quiz";
import styles from "../../GlobalStyles/index.module.css";

interface Props {
  quizData: QuizData[];
  answeredQuestions: number[];
  //an object that holds the selected answers for each question. The key is the question number (index),
  //and the value is a boolean indicating whether the answer is selected or not.
  selectedAnswers: { [key: number]: boolean };
}

const WrongAnswers: React.FC<Props> = ({
  quizData,
  answeredQuestions,
  selectedAnswers,
}) => {
  // This code creates a new array wrongAnswers of wrong answered quiz questions.
  const wrongAnswers = quizData
    // It filters the quizData array by questions that have not been answered (i.e. not included in answeredQuestions)
    .filter((question, index) => !answeredQuestions.includes(index))
    // maps over this filtered array and for each question, maps over the answer options.
    .map((question) => {
      // It returns an object for each answer option with the answer text, whether it is correct, and whether it was selected.
      return {
        pitanje: question.pitanje,
        odgovori: question.odgovori.map((answer) => {
          // The resulting object is added to the wrongAnswers array.
          return {
            odgovor: answer.odgovor,
            correct: question.točniOdgovori.some(
              (correctAnswer) =>
                correctAnswer.id === answer.id && correctAnswer.točan
            ),
            selected: selectedAnswers[answer.id],
          };
        }),
      };
    });

  return (
    <div className={styles.wrongAnswersContainer}>
      {wrongAnswers.length > 0 && (
        <h3>Ovo su pitanja na koja ste pogrešno odgovorili:</h3>
      )}
      {wrongAnswers.map((question, index) => (
        <div key={index}>
          <h3>{question.pitanje}</h3>
          <ul>
            {question.odgovori.map((answer, index) => (
              <li
                key={index}
                style={{
                  color: answer.correct ? "green" : "",
                }}
              >
                {answer.odgovor}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default WrongAnswers;
