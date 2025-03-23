import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetQuizByIdQuery } from "../../features/quiz/quizApi";
import { QuestionI } from "../../features/qbank/qBankApi";
import { useAttemptQuizMutation } from "../../features/result/resultApi";
import { toast } from "react-toastify";

const QuizAttempt = () => {
  const { quizId } = useParams<{ quizId: string }>(); // Ensure quizId is typed
  const { data: quiz, isLoading, isError } = useGetQuizByIdQuery(quizId || ""); // Fetch quiz data
  const [questions, setQuestions] = useState<QuestionI[]>([]); // Store quiz questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0); // Track current question
  const [answers, setAnswers] = useState<number[]>([]); // Store user answers
  const [attemptQuiz, { isLoading: isSubmitting }] = useAttemptQuizMutation(); // RTK Query mutation for quiz attempt
  const navigate = useNavigate();

  // Set questions when quiz data is fetched
  useEffect(() => {
    if (quiz?.questions) {
      setQuestions(quiz.questions);
      // Initialize answers array with -1 (no answer selected)
      setAnswers(new Array(quiz.questions.length).fill(-1));
    }
  }, [quiz]);

  // Handle answer selection
  const handleAnswerSelect = (selectedOption: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(updatedAnswers);
  };

  // Navigate to the next question
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Navigate to the previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Handle quiz submission
  const handleSubmit = async () => {
    if (!quizId) {
      toast.error("Quiz ID is missing.");
      return;
    }

    // Ensure all questions are answered
    if (answers.includes(-1)) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    try {
      await attemptQuiz({
        quizId: quizId,
        answers: answers,
      })
        .unwrap()
        .then((res) => {
          toast.success(
            `Quiz submitted successfully! Your score: ${res.score}`
          );
          navigate("../");
        });
    } catch (error) {
      toast.error("Failed to submit the quiz. Please try again.");
      console.error("Quiz submission error:", error);
    }
  };

  // Show loading state while fetching quiz data
  if (isLoading) {
    return <div>Loading quiz...</div>;
  }

  // Show error state if quiz data fetching fails
  if (isError || !quiz) {
    return <div>Failed to load quiz. Please try again later.</div>;
  }

  // Show message if no questions are found
  if (questions.length === 0) {
    return <div>No questions found for this quiz.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-white">
      <h2 className="text-xl font-bold mb-4">
        Question {currentQuestionIndex + 1} of {questions.length}
      </h2>
      <p className="mb-4">{currentQuestion.text}</p>
      <ul className="space-y-2">
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="answer"
                value={index}
                checked={answers[currentQuestionIndex] === index}
                onChange={() => handleAnswerSelect(index)}
                className="form-radio"
              />
              <span>{option}</span>
            </label>
          </li>
        ))}
      </ul>
      <div className="flex justify-around mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="bg-accent  px-4 py-2 rounded disabled:bg-gray-300 disabled:text-gray-500"
        >
          Previous
        </button>
        {currentQuestionIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-secondary text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === questions.length - 1}
            className="bg-accent  px-4 py-2 rounded disabled:bg-gray-300"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizAttempt;
