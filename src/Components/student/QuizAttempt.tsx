import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetQuizByIdQuery } from "../../features/quiz/quizApi";
import { QuestionI } from "../../features/qbank/qBankApi";
import { useAttemptQuizMutation } from "../../features/result/resultApi";
import { toast } from "sonner";
import Loader from "../Loader";
import { NoResult } from "../NoResult";

const QuizAttempt = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const { data: quiz, isLoading, isError } = useGetQuizByIdQuery(quizId || "");
  const [questions, setQuestions] = useState<QuestionI[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [attemptQuiz, { isLoading: isSubmitting }] = useAttemptQuizMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (quiz?.questions) {
      setQuestions(quiz.questions);
      setAnswers(new Array(quiz.questions.length).fill(-1));
    }
  }, [quiz]);

  const handleAnswerSelect = (selectedOption: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (!quizId) {
      toast.error("Quiz ID is missing.");
      return;
    }

    if (answers.includes(-1)) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    try {
      const res = await attemptQuiz({ quizId, answers }).unwrap();
      toast.success(`Quiz submitted successfully! Your score: ${res.score}`);
      navigate("/student");
    } catch {
      toast.error("Failed to submit the quiz. Please try again.");
    }
  };

  if (isLoading) return <Loader />;

  if (isError || !quiz || !questions.length) {
    return <NoResult message="Quiz not found or no questions found." />;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background text-text-primary p-4">
      <div className="card w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <p className="text-sm text-text-secondary">{currentQuestion.text}</p>
        </div>

        {/* Options */}
        <ul className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <li key={index}>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={index}
                  checked={answers[currentQuestionIndex] === index}
                  onChange={() => handleAnswerSelect(index)}
                  className="accent-accent"
                />
                <span className="break-words">{option}</span>
              </label>
            </li>
          ))}
        </ul>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          ) : (
            <button onClick={handleNext} className="btn-primary">
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizAttempt;
