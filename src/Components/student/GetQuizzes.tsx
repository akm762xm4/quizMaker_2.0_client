import { QuizItem } from "../../features/quiz/QuizItem";
import { useGetAvailableQuizzesQuery } from "../../features/result/resultApi";

export const GetQuizzes = () => {
  const { data: quizzes } = useGetAvailableQuizzesQuery();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col gap-3 p-4 md:px-[20%]">
        {quizzes?.map((quiz) => (
          <QuizItem key={quiz._id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
};
