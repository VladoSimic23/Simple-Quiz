import { QuizData } from "../Quiz/Quiz";
import styles from "../../GlobalStyles/index.module.css";
import useFirebaseData from "../useFirebaseData";

// Props for QuizQuestion component
interface QuizQuestionProps {
  // Data for current quiz question
  currentQuestionData: QuizData;
  // Object holding the selected status of each answer
  selectedAnswers: { [key: number]: boolean };
  // Function to handle answer selection
  handleAnswerSelection: (answerId: number) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  currentQuestionData,
  selectedAnswers,
  handleAnswerSelection,
}) => {
  const { firebaseData } = useFirebaseData();

  // Check if there is data for current question
  if (!currentQuestionData) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.questionContainer}>
      <div className={styles.questionText}>
        <h2>{currentQuestionData.pitanje}</h2>
        <h3>
          {currentQuestionData.id} / {firebaseData.length}
        </h3>
      </div>
      <div className={styles.answersGrid}>
        <div className={styles.answersContainer}>
          {currentQuestionData.odgovori.map((answer) => (
            <div className={styles.answerContainer} key={answer.id}>
              <span>{answer.id}.</span>
              <input
                type="checkbox"
                checked={selectedAnswers[answer.id]}
                onChange={() => handleAnswerSelection(answer.id)}
              />
              <p>{answer.odgovor}</p>
            </div>
          ))}
        </div>
        {currentQuestionData.image && (
          <div className={styles.questionImage}>
            <img
              src={currentQuestionData.image}
              alt={currentQuestionData.pitanje}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizQuestion;
