import { useEffect, useState } from "react";
import { Quiz, useDeleteQuizMutation, useToggleQuizMutation } from "./quizApi";
import { Modal } from "../../Components/Modal";
import { QuizPage } from "./QuizPage";
import { DeleteForm } from "../user/DeleteForm";
import { useNavigate } from "react-router-dom";
import { AddQuizForm } from "./AddQuizForm";
import Toggle from "../../Components/Toggle";
import { toast } from "react-toastify";
import { ErrorI } from "../../types";
import { HiDotsHorizontal } from "react-icons/hi";
import { getUser } from "../../utils/localStorage";
import { FaPlay } from "react-icons/fa6";

interface QuizItemProps {
  quiz: Quiz;
}

export const QuizItem: React.FC<QuizItemProps> = ({ quiz }) => {
  const [deleteQuiz] = useDeleteQuizMutation();
  const [isModalOpen, setIsModalOpen] = useState<boolean | false>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [toggleQuiz] = useToggleQuizMutation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const loggedUser = getUser();

  const handleTitleClick = () => {
    if (loggedUser.role === "admin") {
      setIsModalOpen(true);
    } else {
      navigate(`${quiz._id}`);
    }
  };

  const handleToggleQuiz = async () => {
    try {
      await toggleQuiz(quiz._id)
        .unwrap()
        .then((res) => {
          toast.success(res.message);
        });
    } catch (error) {
      const err = error as ErrorI;
      toast.error(err?.data?.error);
    }
  };

  const handleDeleteQuiz = async () => {
    await deleteQuiz(quiz?._id)
      .unwrap()
      .then(() => setIsDeleteOpen(false));
  };

  const handleClickOutside = (event: MouseEvent) => {
    const menu = document.getElementById("context-menu");
    if (menu && !menu.contains(event.target as Node)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="bg-primary p-2 rounded flex flex-row items-center justify-between">
        <div className="flex flex-col items-start">
          <span className="text-lg md:text-xl font-bold">{quiz.title}</span>
          {loggedUser.role === "admin" && (
            <span className="text-sm md:text-base text-gray-600">
              createdBy : {quiz?.createdBy?.username}
            </span>
          )}
        </div>
        {loggedUser.role === "student" && (
          <button
            onClick={() => navigate(`/student/${quiz._id}`)}
            title="attemp"
          >
            <FaPlay size={24} />
          </button>
        )}
        <div
          className={`relative ${loggedUser.role === "student" && "hidden"}`}
        >
          {/* Three-dot button */}
          <button
            title="context"
            onClick={() => setIsVisible(!isVisible)}
            className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
          >
            <HiDotsHorizontal className="w-5 h-5 text-gray-600" />
          </button>

          {/* Context menu */}
          {isVisible && (
            <div
              id="context-menu"
              className="absolute top-10 right-0 bg-white/50 backdrop-blur-xl divide-y border shadow-xl shadow-primary/20 rounded-md z-50 flex flex-col w-max  "
            >
              <span className="p-2 flex items-center justify-around text-sm md:text-base">
                <span>Toggle</span>
                <Toggle checked={quiz.enabled} onChange={handleToggleQuiz} />
              </span>
              <button
                className="p-2 hover:text-accent text-sm md:text-base"
                onClick={() => {
                  setIsVisible(false);
                  setIsEditOpen(true);
                }}
              >
                Edit
              </button>
              <button
                className="p-2 hover:text-accent text-sm md:text-base"
                onClick={() => {
                  setIsVisible(false);
                  handleTitleClick();
                }}
              >
                {loggedUser.role === "admin" && "View Quiz Info"}
                {loggedUser.role === "faculty" && "Manage Questions"}
              </button>
              <button
                className="p-2 hover:text-accent text-sm md:text-base"
                onClick={() => {
                  setIsVisible(false);
                  setIsDeleteOpen(true);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
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
          title="Delete Quiz"
          setIsOpen={setIsDeleteOpen}
          child={
            <DeleteForm
              deleteHandler={handleDeleteQuiz}
              name={quiz.title}
              closeModal={() => setIsDeleteOpen(false)}
            />
          }
        />
      )}
      {isEditOpen && (
        <Modal
          title="Rename Quiz"
          setIsOpen={setIsEditOpen}
          child={
            <AddQuizForm
              closeModal={() => setIsEditOpen(false)}
              isEdit={true}
              quiz={quiz}
            />
          }
        />
      )}
    </>
  );
};
