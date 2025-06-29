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
  const [deleteQBank, { isLoading: isDeleting }] = useDeleteQBankMutation();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  const loggedUser = getUser();

  const handleDeleteQBank = async () => {
    await deleteQBank(qBank._id)
      .unwrap()
      .then(() => setIsDeleteOpen(false));
  };

  return (
    <>
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="card flex items-start justify-between gap-4 transition-all hover:shadow-lg"
      >
        {/* Left side: title and meta */}
        <div className="flex flex-col">
          {loggedUser.role === "faculty" ? (
            <button
              title="view"
              onClick={() => navigate(`${qBank._id}`)}
              className="text-lg font-semibold text-left text-accent hover:underline"
            >
              {qBank.title}
            </button>
          ) : (
            <span className="text-lg font-semibold text-text-primary">
              {qBank.title}
            </span>
          )}
          <span className="text-sm text-text-secondary">
            Created by: {qBank?.createdBy?.username}
          </span>
        </div>

        {/* Actions */}
        <div
          className={`flex items-center gap-3 ${
            isHovering ? "opacity-100" : "opacity-0 md:opacity-100"
          } transition-opacity`}
        >
          <button
            onClick={() => setIsEditOpen(true)}
            title="Edit"
            className="text-text-secondary hover:text-accent"
          >
            <MdEditNote size={22} />
          </button>
          <button
            onClick={() => setIsDeleteOpen(true)}
            title="Delete"
            className="text-text-secondary hover:text-danger"
          >
            <MdDelete size={22} />
          </button>
        </div>
      </div>

      {/* Edit Modal */}
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

      {/* Delete Modal */}
      {isDeleteOpen && (
        <Modal
          title="Delete QuestionBank"
          setIsOpen={setIsDeleteOpen}
          child={
            <DeleteForm
              name={qBank.title}
              deleteHandler={handleDeleteQBank}
              closeModal={() => setIsDeleteOpen(false)}
              isLoading={isDeleting}
            />
          }
        />
      )}
    </>
  );
};
