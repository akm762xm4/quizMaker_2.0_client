import { useEffect, useState } from "react";
import { Quiz, useGetQuizzesQuery } from "../../features/quiz/quizApi";
import { QuizItem } from "../../features/quiz/QuizItem";
import { Modal } from "../Modal";
import { AddQuizForm } from "../../features/quiz/AddQuizForm";
import { FiPlus, FiSearch } from "react-icons/fi";
import { NoResult } from "../NoResult";
import Loader from "../Loader";

export const Quizzes = () => {
  const { data: quizzes, isLoading, isFetching } = useGetQuizzesQuery();
  const [isAddOpen, setIsAddOpen] = useState(false);
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
    <>
      <div className="dashboard-page">
        {/* Page Header with Add Button */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">Faculty tools</p><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Your quizzes</h1><p className="mt-2 text-slate-600 dark:text-slate-300">Create, publish, and refine assessments for your learners.</p></div>
          <button
            onClick={() => setIsAddOpen(true)}
            className="btn-dashboard"
          >
            <FiPlus aria-hidden="true" />
            Add Quiz
          </button>
        </div>

        {/* Search Bar */}
        <div className="surface-card mb-6 flex items-center gap-3 p-3">
          <FiSearch aria-hidden="true" size={20} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search quizzes..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="!border-0 !bg-transparent !p-1 !ring-0"
          />
        </div>

        {/* Quiz List */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredQuizzes?.map((quiz) => (
            <QuizItem key={quiz._id} quiz={quiz} />
          ))}
        </div>
      </div>

      {/* Modal for Adding Quiz */}
      {isAddOpen && (
        <Modal
          title="Add Quiz"
          isOpen={isAddOpen}
          setIsOpen={setIsAddOpen}
          child={
            <AddQuizForm
              isEdit={false}
              closeModal={() => setIsAddOpen(false)}
            />
          }
        />
      )}
    </>
  );
};
