import { useState } from "react";
import { IQBank, useDeleteQBankMutation } from "./qBankApi";
import { MdDelete, MdEditNote } from "react-icons/md";
import { Modal } from "../../Components/Modal";
import { DeleteForm } from "../user/DeleteForm";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/localStorage";
import { AddQBankForm } from "./AddQBankForm";

interface QBankItemProps {
  qBank: IQBank;
}
export const QBankItem: React.FC<QBankItemProps> = ({ qBank }) => {
  const [deleteQBank] = useDeleteQBankMutation();
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean | false>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean | false>(false);
  const [isHovering, setIsHovering] = useState<boolean | false>(false);
  const navigate = useNavigate();
  const loggedUser = getUser();

  const handleDeleteQBank = async () => {
    await deleteQBank(qBank?._id)
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
        <div className="flex flex-col items-start">
          {loggedUser.role === "faculty" ? (
            <button
              title="view"
              onClick={() => navigate(`${qBank._id}`)}
              className="text-sm md:text-xl font-bold"
            >
              {qBank.title}
            </button>
          ) : (
            <span className="text-sm md:text-xl font-bold">{qBank.title}</span>
          )}
          <span className="text-sm text-gray-600">
            createdBy : {qBank?.createdBy?.username}
          </span>
        </div>
        <div
          className={`flex items-center gap-2 md:gap-4 ${
            !isHovering && "flex md:hidden"
          }`}
        >
          <button onClick={() => setIsEditOpen(true)} title="edit">
            <MdEditNote size={24} />
          </button>
          <button onClick={() => setIsDeleteOpen(true)} title="delete">
            <MdDelete size={24} />
          </button>
        </div>
      </div>
      {isEditOpen && (
        <Modal
          title="Edit QuestionBank"
          setIsOpen={setIsEditOpen}
          child={
            <AddQBankForm
              isEdit={true}
              closeModal={() => setIsEditOpen(false)}
              qBank={qBank}
            />
          }
        />
      )}
      {isDeleteOpen && (
        <Modal
          title="Delete"
          setIsOpen={setIsDeleteOpen}
          child={
            <DeleteForm
              name={qBank.title}
              deleteHandler={handleDeleteQBank}
              closeModal={() => setIsDeleteOpen(false)}
            />
          }
        />
      )}
    </>
  );
};
