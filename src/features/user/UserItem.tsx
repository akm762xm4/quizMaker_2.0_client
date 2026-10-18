import { toast } from "sonner";
import Toggle from "../../Components/Toggle";
import { useDeleteUserMutation, UserI, useToggleUserMutation } from "./usersApi";
import { MdDelete, MdEditNote } from "react-icons/md";
import { FiBookOpen, FiMoreHorizontal, FiUser } from "react-icons/fi";
import { useState } from "react";
import { Modal } from "../../Components/Modal";
import { DeleteForm } from "./DeleteForm";
import { EditUserForm } from "./EditUserForm";

export const UserItem: React.FC<{ user: UserI }> = ({ user }) => {
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [toggleUser] = useToggleUserMutation();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const isFaculty = user.role === "faculty";
  const RoleIcon = isFaculty ? FiBookOpen : FiUser;
  return <>
    <article className="surface-card group relative overflow-hidden p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className={`absolute inset-x-0 top-0 h-1 ${isFaculty ? "bg-violet-500" : "bg-emerald-500"}`} />
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3"><span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-bold ${isFaculty ? "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"}`}>{user.username.slice(0, 1).toUpperCase()}</span><div className="min-w-0"><h3 className="truncate font-bold">{user.username}</h3><span className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ${isFaculty ? "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"}`}><RoleIcon aria-hidden="true" size={12} />{isFaculty ? "Faculty" : "Student"}</span></div></div>
        <div className="relative"><button type="button" aria-label={`Actions for ${user.username}`} aria-expanded={isActionsOpen} onClick={() => setIsActionsOpen((open) => !open)} className="icon-button h-9 w-9"><FiMoreHorizontal aria-hidden="true" size={19} /></button>{isActionsOpen && <div className="absolute right-0 z-10 mt-1 w-32 rounded-xl border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900"><button type="button" onClick={() => { setIsEditOpen(true); setIsActionsOpen(false); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"><MdEditNote aria-hidden="true" />Edit</button><button type="button" onClick={() => { setIsDeleteOpen(true); setIsActionsOpen(false); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950"><MdDelete aria-hidden="true" />Delete</button></div>}</div>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800"><span className={`text-xs font-bold ${user.isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500"}`}>{user.isActive ? "Active account" : "Inactive account"}</span><Toggle checked={user.isActive} onChange={async () => { await toggleUser(user._id).unwrap().then((res) => toast.success(res.message)); }} /></div>
    </article>
    {isEditOpen && <Modal title="Edit user" child={<EditUserForm closeModal={() => setIsEditOpen(false)} user={user} />} setIsOpen={setIsEditOpen} />}
    {isDeleteOpen && <Modal title="Delete user" child={<DeleteForm deleteHandler={async () => { await deleteUser(user._id).unwrap().then(() => setIsDeleteOpen(false)); }} closeModal={() => setIsDeleteOpen(false)} name={user.username} isLoading={isDeleting} />} setIsOpen={setIsDeleteOpen} />}
  </>;
};
