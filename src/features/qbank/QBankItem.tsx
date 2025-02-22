import { useState } from "react";
import { IQBank } from "./qBankApi";
import { MdDelete } from "react-icons/md";
import { Modal } from "../../Components/Modal";
import { DeleteUserForm } from "../user/DeleteUserForm";

interface QBankItemProps {
  qBank: IQBank;
}
export const QBankItem: React.FC<QBankItemProps> = ({ qBank }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isHovering, setIsHovering] = useState<boolean | false>(false);
  return (
    <>
      <div
        onMouseOver={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="bg-primary p-2 rounded flex flex-row items-center justify-between"
      >
        <div className="flex flex-col">
          <span className="text-xl font-bold">{qBank.title}</span>
          <span className="text-sm">
            createdBy : {qBank.createdBy.username}
          </span>
        </div>
        {isHovering && (
          <div className="px-2">
            <button onClick={() => setIsDeleteOpen(true)} title="delete">
              <MdDelete size={24} />
            </button>
          </div>
        )}
      </div>
      {isDeleteOpen && (
        <Modal
          title="Delete"
          setIsOpen={setIsDeleteOpen}
          child={
            <DeleteUserForm
              qBank={qBank}
              closeModal={() => setIsDeleteOpen(false)}
            />
          }
        />
      )}
    </>
  );
};
