import { TbFilterSearch } from "react-icons/tb";
import { Quiz, useGetAllQuizzesQuery } from "../../features/quiz/quizApi";
import { QuizItem } from "../../features/quiz/QuizItem";
import { useEffect, useState } from "react";
import { NoResult } from "../NoResult";

export const Quizzes = () => {
  const { data: quizzes } = useGetAllQuizzesQuery();
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[] | undefined>();
  const [term, setTerm] = useState("");

  useEffect(() => {
    let filtered = quizzes;

    filtered = filtered?.filter((quiz) =>
      quiz.title.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredQuizzes(filtered);
  }, [term, quizzes]);

  if (!quizzes?.length) {
    return <NoResult />;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 flex  gap-3 bg-primary/20">
        <TbFilterSearch size={24} />
        <input
          type="text"
          placeholder="Search by quiz title"
          value={term}
          onChange={(e) => setTerm(() => e.target.value)}
          className="bg-primary outline-none rounded px-1 placeholder:text-xs"
        />
      </div>
      <div className="flex flex-col gap-2 p-2 px-[20%]">
        {filteredQuizzes?.map((quiz) => (
          <QuizItem key={quiz._id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
};
