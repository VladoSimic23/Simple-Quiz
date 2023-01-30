import globalStyles from "../../GlobalStyles/index.module.css";

// Props for QuizControls component
interface QuizControlsProps {
  // Function to handle moving to next question
  handleNextQuestion: () => void;
}

const QuizControls: React.FC<QuizControlsProps> = ({ handleNextQuestion }) => {
  return (
    <div>
      {/* Button to move to next question */}
      <button className={globalStyles.btn} onClick={handleNextQuestion}>
        Next
      </button>
    </div>
  );
};

export default QuizControls;
