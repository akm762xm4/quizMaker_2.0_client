import { useState } from "react";
import { Result } from "./resultApi";
import { MdDelete } from "react-icons/md";
import { Modal } from "../../Components/Modal";
import { DeleteForm } from "../user/DeleteForm";
import { ResultPage } from "./ResultPage";

interface ResultItemProps {
  result: Result;
}
export const ResultItem: React.FC<ResultItemProps> = ({ result }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean | false>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isHovering, setIsHovering] = useState<boolean | false>(false);

  const deleteResultHandler = async () => {
    setIsDeleteOpen(false);
  };
  return (
    <>
      <div
        onMouseOver={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="bg-primary p-2 rounded flex flex-row items-center justify-between"
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex flex-col items-start"
        >
          <div className="text-xl font-bold">{result.quizId.title}</div>
          <span className="text-sm">Student : {result.studentId.username}</span>
        </button>
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
          title={`Result of ${result.studentId.username}`}
          child={<ResultPage result={result} />}
          setIsOpen={setIsModalOpen}
        />
      )}
      {isDeleteOpen && (
        <Modal
          title="Delete"
          setIsOpen={setIsDeleteOpen}
          child={
            <DeleteForm
              name="result"
              deleteHandler={deleteResultHandler}
              closeModal={() => setIsDeleteOpen(false)}
            />
          }
        />
      )}
    </>
  );
};
