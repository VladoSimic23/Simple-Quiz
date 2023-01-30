import { QuizData } from "../Quiz/Quiz";
import WrongAnswers from "../WrongAnswers/WrongAnswers";
import styles from "../../GlobalStyles/index.module.css";

// Props for QuizResults component
interface QuizResultsProps {
  // Total score
  score: number;
  // Array of answered question ids
  answeredQuestions: number[];
  // Object holding the selected status of each answer
  selectedAnswers: { [key: number]: boolean };
  // Array of quiz question data
  quizData: QuizData[];
}

const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  answeredQuestions,
  selectedAnswers,
  quizData,
}) => {
  // if score is greater that 107 it means that you passed the test with a message "Prošli ste!, and displays your score"
  // also if you had a wrong asnwers, renders a Wrong Answers component and displays them
  if (score > 107) {
    return (
      <div>
        <h2>Prošli ste !</h2>
        <h2>
          Vaš rezultat je:
          <span className={styles.textGreen}>{score}</span>
        </h2>
        {answeredQuestions.length > 0 && (
          <WrongAnswers
            quizData={quizData}
            answeredQuestions={answeredQuestions}
            selectedAnswers={selectedAnswers}
          />
        )}
      </div>
    );
  }
  // if score is less than or equal to 107 it means that you did not pass the test with a message "Pali ste!, and displays your score"
  // also renders a Wrong Answers component and displays them
  if (score <= 107) {
    return (
      <div>
        <h2>Pali ste !</h2>
        <h2>
          Vaš rezultat je:
          <span className={styles.textRed}> {score}</span>
        </h2>
        {answeredQuestions.length > 0 && (
          <WrongAnswers
            quizData={quizData}
            answeredQuestions={answeredQuestions}
            selectedAnswers={selectedAnswers}
          />
        )}
      </div>
    );
  }

  return null;
};

export default QuizResults;
