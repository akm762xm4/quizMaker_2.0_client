import { useState } from "react";
import { Result, useDeleteResultMutation } from "./resultApi";
import { MdDelete } from "react-icons/md";
import { Modal } from "../../Components/Modal";
import { DeleteForm } from "../user/DeleteForm";
import { ResultPage } from "./ResultPage";

interface ResultItemProps {
  result: Result;
}

export const ResultItem: React.FC<ResultItemProps> = ({ result }) => {
  const [deleteResult, { isLoading: isDeleting }] = useDeleteResultMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const deleteResultHandler = async () => {
    await deleteResult(result._id)
      .unwrap()
      .then(() => setIsDeleteOpen(false));
  };

  return (
    <>
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="card flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:shadow-lg"
      >
        {/* Left: Quiz & student info */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-left flex-1"
        >
          <div className="text-lg font-semibold text-accent hover:underline">
            {result.quizId.title}
          </div>
          <div className="text-sm text-text-secondary">
            Student: {result.studentId.username}
          </div>
          <div className="text-xs text-text-secondary mt-1">
            Attempted on:{" "}
            {new Date(result.attemptedOn).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </button>

        {/* Right: Score + Delete button */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="bg-accent/10 text-accent px-4 py-1.5 text-sm rounded-full font-semibold">
            {result.score}/{result.totalMarks}
          </div>
          <button
            onClick={() => setIsDeleteOpen(true)}
            title="Delete"
            className={`text-text-secondary hover:text-danger transition ${
              isHovering ? "opacity-100" : "opacity-0 md:opacity-100"
            }`}
          >
            <MdDelete size={20} />
          </button>
        </div>
      </div>

      {/* Result Modal */}
      {isModalOpen && (
        <Modal
          title={`Result of ${result.studentId.username}`}
          child={<ResultPage result={result} />}
          setIsOpen={setIsModalOpen}
        />
      )}

      {/* Delete Modal */}
      {isDeleteOpen && (
        <Modal
          title="Delete Result"
          setIsOpen={setIsDeleteOpen}
          child={
            <DeleteForm
              name="result"
              deleteHandler={deleteResultHandler}
              closeModal={() => setIsDeleteOpen(false)}
              isLoading={isDeleting}
            />
          }
        />
      )}
    </>
  );
};
