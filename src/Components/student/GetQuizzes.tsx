import { QuizItem } from "../../features/quiz/QuizItem";
import { useGetAvailableQuizzesQuery } from "../../features/result/resultApi";
import { Loader } from "../Loader";
import { NoResult } from "../NoResult";

export const GetQuizzes = () => {
  const {
    data: quizzes,
    isLoading,
    isFetching,
  } = useGetAvailableQuizzesQuery();

  if (isLoading || isFetching) return <Loader />;

  if (!isLoading && !isFetching && !quizzes?.length) {
    return <NoResult message="No quizzes found." />;
  }

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <div className="page-container py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="section-heading">🎓 Available Quizzes</h1>
          <p className="text-text-secondary text-sm">
            Attempt quizzes assigned to you. Make sure you're prepared!
          </p>
        </div>

        {/* Quizzes List */}
        <div className="flex flex-col gap-4">
          {quizzes?.map((quiz) => (
            <QuizItem key={quiz._id} quiz={quiz} />
          ))}
        </div>
      </div>
    </div>
  );
};
