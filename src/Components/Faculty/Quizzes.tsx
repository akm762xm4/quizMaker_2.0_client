import { useEffect, useState } from "react";
import { Quiz, useGetQuizzesQuery } from "../../features/quiz/quizApi";
import { QuizItem } from "../../features/quiz/QuizItem";
import { FaPlus } from "react-icons/fa";
import { Modal } from "../Modal";
import { AddQuizForm } from "../../features/quiz/AddQuizForm";
// import { NoResult } from "../NoResult";
import { TbFilterSearch } from "react-icons/tb";

export const Quizzes = () => {
  const { data: quizzes } = useGetQuizzesQuery();
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[] | undefined>();
  const [term, setTerm] = useState("");

  useEffect(() => {
    let filtered = quizzes;

    filtered = filtered?.filter((quiz) =>
      quiz.title.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredQuizzes(filtered);
  }, [term, quizzes]);

  // if (!quizzes?.length) {
  //   return <NoResult />;
  // }

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="p-4 flex items-center gap-3 bg-primary/20">
          <TbFilterSearch size={24} />
          <input
            type="text"
            placeholder="Search by quiz title"
            value={term}
            onChange={(e) => setTerm(() => e.target.value)}
            className="bg-primary outline-none rounded p-1 md:px-1 placeholder:text-xs w-full md:w-auto text-sm md:text-base"
          />
        </div>
        <div className="flex flex-col gap-3 p-4 md:px-[20%]">
          {filteredQuizzes?.map((quiz) => (
            <QuizItem key={quiz._id} quiz={quiz} />
          ))}
          <button
            title="add quiz"
            className="bg-primary p-2 rounded flex flex-row items-center justify-center"
            onClick={() => setIsAddOpen(true)}
          >
            <FaPlus size={24} />
          </button>
        </div>
      </div>

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
