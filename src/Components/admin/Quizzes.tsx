import { useState } from "react";
import { useEffect } from "react";
import { TbFilterSearch } from "react-icons/tb";
import { Quiz, useGetAllQuizzesQuery } from "../../features/quiz/quizApi";
import { NoResult } from "../NoResult";
import { QuizItem } from "../../features/quiz/QuizItem";
import { PageHeader } from "../PageHeader";
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
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Quizzes Overview"
        description="Browse and manage all quizzes created by faculties. Search or update any quiz easily."
      />

      {/* Filter Section */}
      <h2 className="text-2xl font-semibold px-4 md:px-[10%] mt-4 mb-2">
        All Quizzes
      </h2>

      <div className="p-4 flex flex-col md:flex-row gap-3 md:items-center justify-between bg-primary/20 rounded mb-4 mx-4 md:mx-[10%]">
        <div className="flex items-center gap-2 w-full md:max-w-md">
          <TbFilterSearch size={20} className="text-text-secondary" />
          <input
            type="text"
            placeholder="Search by quiz title"
            value={term}
            onChange={(e) => setTerm(() => e.target.value)}
            className="bg-primary w-full outline-none rounded p-2 placeholder:text-sm text-sm border border-gray-200 focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      {/* Quiz Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-[10%]">
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
