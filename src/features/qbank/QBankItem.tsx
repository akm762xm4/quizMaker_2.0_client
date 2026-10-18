import { useState } from "react";
import { IQBank, useDeleteQBankMutation } from "./qBankApi";
import { MdDelete, MdEditNote } from "react-icons/md";
import { Modal } from "../../Components/Modal";
import { DeleteForm } from "../user/DeleteForm";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/localStorage";
import { AddQBankForm } from "./AddQBankForm";
import { FiBookOpen, FiMoreHorizontal } from "react-icons/fi";

interface QBankItemProps {
  qBank: IQBank;
}

export const QBankItem: React.FC<QBankItemProps> = ({ qBank }) => {
  const [deleteQBank, { isLoading: isDeleting }] = useDeleteQBankMutation();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const navigate = useNavigate();
  const loggedUser = getUser()!;
  const isFaculty = loggedUser.role === "faculty";

  const handleDeleteQBank = async () => {
    await deleteQBank(qBank._id)
      .unwrap()
      .then(() => setIsDeleteOpen(false));
  };

  return (
    <>
      <article className="surface-card group relative overflow-hidden p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
        <div className="absolute inset-x-0 top-0 h-1 bg-violet-500" />

        <div className="flex items-start justify-between gap-3">
          {/* Icon + info */}
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              <FiBookOpen aria-hidden="true" size={20} />
            </span>
            <div className="min-w-0">
              {isFaculty ? (
                <button
                  type="button"
                  onClick={() => navigate(`${qBank._id}`)}
                  className="truncate text-left font-bold hover:text-violet-600 dark:hover:text-violet-300 transition"
                >
                  {qBank.title}
                </button>
              ) : (
                <p className="truncate font-bold">{qBank.title}</p>
              )}
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                by {qBank?.createdBy?.username}
              </p>
            </div>
          </div>

          {/* Actions menu */}
          <div className="relative">
            <button
              type="button"
              aria-label={`Actions for ${qBank.title}`}
              aria-expanded={isActionsOpen}
              onClick={() => setIsActionsOpen((o) => !o)}
              className="icon-button h-9 w-9"
            >
              <FiMoreHorizontal aria-hidden="true" size={19} />
            </button>
            {isActionsOpen && (
              <div className="absolute right-0 z-10 mt-1 w-36 rounded-xl border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                <button
                  type="button"
                  onClick={() => { setIsEditOpen(true); setIsActionsOpen(false); }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <MdEditNote aria-hidden="true" />Edit
                </button>
                <button
                  type="button"
                  onClick={() => { setIsDeleteOpen(true); setIsActionsOpen(false); }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950"
                >
                  <MdDelete aria-hidden="true" />Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            {qBank.questions?.length ?? 0} question{qBank.questions?.length !== 1 ? "s" : ""}
          </span>
        </div>
      </article>

      {isEditOpen && (
        <Modal
          title="Edit Question Bank"
          setIsOpen={setIsEditOpen}
          child={<AddQBankForm isEdit closeModal={() => setIsEditOpen(false)} qBank={qBank} />}
        />
      )}
      {isDeleteOpen && (
        <Modal
          title="Delete Question Bank"
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
