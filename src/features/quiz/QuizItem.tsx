import { useEffect, useState } from "react";
import { Quiz, useDeleteQuizMutation, useToggleQuizMutation } from "./quizApi";
import { Modal } from "../../Components/Modal";
import { QuizPage } from "./QuizPage";
import { DeleteForm } from "../user/DeleteForm";
import { useNavigate } from "react-router-dom";
import { AddQuizForm } from "./AddQuizForm";
import Toggle from "../../Components/Toggle";
import { toast } from "sonner";
import { ErrorI } from "../../types";
import { HiDotsHorizontal } from "react-icons/hi";
import { getUser } from "../../utils/localStorage";
import { FaPlay } from "react-icons/fa6";

interface QuizItemProps {
  quiz: Quiz;
}

export const QuizItem: React.FC<QuizItemProps> = ({ quiz }) => {
  const [deleteQuiz, { isLoading: isDeleting }] = useDeleteQuizMutation();
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
      <div className="card flex flex-col md:flex-row items-start md:items-center justify-between gap-3 relative">
        {/* Quiz Info */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg md:text-xl font-semibold text-text-primary">
            {quiz.title}
          </h3>
          {loggedUser.role === "admin" && (
            <p className="text-sm text-text-secondary">
              Created by:{" "}
              <span className="font-medium">{quiz?.createdBy?.username}</span>
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Student Play Button */}
          {loggedUser.role === "student" && (
            <button
              onClick={() => navigate(`/student/${quiz._id}`)}
              title="Attempt Quiz"
              className="p-2 rounded bg-accent text-white hover:bg-purple-700 transition"
            >
              <FaPlay size={18} />
            </button>
          )}

          {/* Faculty/Admin Actions */}
          {loggedUser.role !== "student" && (
            <div className="relative">
              <button
                title="More Options"
                onClick={() => setIsVisible(!isVisible)}
                className="p-2 rounded hover:bg-muted transition"
              >
                <HiDotsHorizontal className="text-text-secondary" size={18} />
              </button>

              {isVisible && (
                <div
                  id="context-menu"
                  className="absolute top-10 right-0 bg-white border rounded-md shadow-modal z-50 min-w-[12rem] overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-2 text-sm text-text-primary">
                    <span>Enabled</span>
                    <Toggle
                      checked={quiz.enabled}
                      onChange={handleToggleQuiz}
                    />
                  </div>
                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:text-accent transition"
                    onClick={() => {
                      setIsVisible(false);
                      setIsEditOpen(true);
                    }}
                  >
                    Rename
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:text-accent transition"
                    onClick={() => {
                      setIsVisible(false);
                      handleTitleClick();
                    }}
                  >
                    {loggedUser.role === "admin"
                      ? "View Quiz Info"
                      : "Manage Questions"}
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-red-50"
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
          )}
        </div>
      </div>

      {/* Modals */}
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
              isLoading={isDeleting}
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
              isEdit
              quiz={quiz}
            />
          }
        />
      )}
    </>
  );
};
