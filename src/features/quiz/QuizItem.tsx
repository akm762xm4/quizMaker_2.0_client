import { useState } from "react";
import { Quiz } from "./quizApi";
import { Modal } from "../../Components/Modal";
import { QuizPage } from "./QuizPage";
import { MdDelete } from "react-icons/md";
import { DeleteUserForm } from "../user/DeleteUserForm";

interface QuizItemProps {
  quiz: Quiz;
}

export const QuizItem: React.FC<QuizItemProps> = ({ quiz }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean | false>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isHovering, setIsHovering] = useState<boolean | false>(false);

  return (
    <>
      <div
        onMouseOver={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="bg-primary p-2 rounded flex flex-row items-center justify-between"
      >
        <div className="flex flex-col items-start">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-xl font-bold"
          >
            {quiz.title}
          </button>
          <span className="text-sm">createdBy : {quiz.createdBy.username}</span>
        </div>
        {isHovering && (
          <div className="px-2">
            <button onClick={() => setIsDeleteOpen(true)} title="delete">
              <MdDelete size={24} />
            </button>
          </div>
        )}
      </div>
      {isModalOpen && (
        <Modal
          title={quiz.title}
          child={<QuizPage quiz={quiz} />}
          setIsOpen={setIsModalOpen}
        />
      )}
      {isDeleteOpen && (
        <Modal
          title="Delete"
          setIsOpen={setIsDeleteOpen}
          child={
            <DeleteUserForm
              quiz={quiz}
              closeModal={() => setIsDeleteOpen(false)}
            />
          }
        />
      )}
    </>
  );
};
