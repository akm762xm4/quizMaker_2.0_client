import { useGetAllQuizzesQuery } from "../../features/quiz/quizApi";
import { QuizItem } from "../../features/quiz/QuizItem";

export const Quizzes = () => {
  const { data: quizzes } = useGetAllQuizzesQuery();

  return (
    <div className="flex flex-col ">
      <div className="flex flex-col gap-2 p-2 px-[20%]">
        {quizzes?.map((quiz) => (
          <QuizItem key={quiz._id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
};
