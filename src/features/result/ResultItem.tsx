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
  const [deleteResult] = useDeleteResultMutation();
  const [isModalOpen, setIsModalOpen] = useState<boolean | false>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isHovering, setIsHovering] = useState<boolean | false>(false);

  const deleteResultHandler = async () => {
    await deleteResult(result._id)
      .unwrap()
      .then(() => setIsDeleteOpen(false));
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
          <div className="text-sm md:text-xl font-bold">
            {result.quizId.title}
          </div>
          <span className="text-sm text-gray-600">
            Student : {result.studentId.username}
          </span>
        </button>
        <div className={`px-2 ${!isHovering && "block md:hidden"}`}>
          <button onClick={() => setIsDeleteOpen(true)} title="delete">
            <MdDelete size={24} />
          </button>
        </div>
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
          title="Delete Result"
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
