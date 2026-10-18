import { useState } from "react";
import { useEffect } from "react";
import { TbFilterSearch } from "react-icons/tb";
import { Quiz, useGetAllQuizzesQuery } from "../../features/quiz/quizApi";
import { NoResult } from "../NoResult";
import { QuizItem } from "../../features/quiz/QuizItem";
import Loader from "../Loader";

export const Quizzes = () => {
  const { data: quizzes, isLoading, isFetching } = useGetAllQuizzesQuery();
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[] | undefined>();
  const [term, setTerm] = useState("");

  useEffect(() => {
    const filtered = quizzes?.filter((quiz) =>
      quiz.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredQuizzes(filtered);
  }, [term, quizzes]);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (!isLoading && !isFetching && !quizzes?.length) {
    return <NoResult message="No quizzes found." />;
  }

  return (
    <div className="dashboard-page">
      <div className="mb-8"><p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">Programme catalogue</p><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">All quizzes</h1><p className="mt-2 text-slate-600 dark:text-slate-300">A complete view of every assessment created by your faculty.</p></div>

      {/* Filter Section */}
      <div className="surface-card mb-6 p-4">
        <div className="flex items-center gap-2 w-full md:max-w-md">
          <TbFilterSearch size={20} className="text-text-secondary" />
          <input
            type="text"
            placeholder="Search by quiz title"
            value={term}
            onChange={(e) => setTerm(() => e.target.value)}
            className="bg-primary w-full outline-none rounded p-2 placeholder:text-sm text-sm border border-slate-200 focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      {/* Quiz Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredQuizzes?.length ? (
          filteredQuizzes.map((quiz) => <QuizItem key={quiz._id} quiz={quiz} />)
        ) : (
          <p className="text-center col-span-full text-sm text-text-secondary">
            No quizzes found for "{term}"
          </p>
        )}
      </div>
    </div>
  );
};
