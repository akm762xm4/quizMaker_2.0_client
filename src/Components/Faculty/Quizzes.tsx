import { useEffect, useState } from "react";
import { Quiz, useGetQuizzesQuery } from "../../features/quiz/quizApi";
import { QuizItem } from "../../features/quiz/QuizItem";
import { FaPlus } from "react-icons/fa";
import { Modal } from "../Modal";
import { AddQuizForm } from "../../features/quiz/AddQuizForm";
import { TbFilterSearch } from "react-icons/tb";
import { NoResult } from "../NoResult";
import { PageHeader } from "../PageHeader";
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
      <div className="flex flex-col min-h-screen px-4 md:px-[20%] py-6 gap-6">
        {/* Page Header with Add Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <PageHeader
            title="My Quizzes"
            description="View and manage all quizzes you've created. You can search, edit, or add new ones."
          />
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 text-sm md:text-base bg-accent text-white px-4 py-2 rounded-md hover:bg-purple-700 transition self-start md:self-auto"
          >
            <FaPlus />
            Add Quiz
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-3 bg-highlight/30 border border-muted p-3 rounded-xl">
          <TbFilterSearch size={20} className="text-text-secondary" />
          <input
            type="text"
            placeholder="Search quizzes..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="bg-transparent outline-none text-sm md:text-base w-full placeholder:text-muted-foreground"
          />
        </div>

        {/* Quiz List */}
        <div className="flex flex-col gap-3">
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
