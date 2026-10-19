import { useState } from "react";
import { Quiz, useDeleteQuizMutation, useToggleQuizMutation } from "./quizApi";
import { Modal } from "../../Components/Modal";
import { QuizPage } from "./QuizPage";
import { DeleteForm } from "../user/DeleteForm";
import { useNavigate } from "react-router-dom";
import { AddQuizForm } from "./AddQuizForm";
import Toggle from "../../Components/Toggle";
import { toast } from "sonner";
import { getApiErrorMessage } from "../../utils/apiError";
import { FiClock, FiEdit3, FiMoreHorizontal, FiPlay, FiTrash2 } from "react-icons/fi";
import { getUser } from "../../utils/localStorage";

export const QuizItem: React.FC<{ quiz: Quiz }> = ({ quiz }) => {
  const [deleteQuiz, { isLoading: isDeleting }] = useDeleteQuizMutation(); const [toggleQuiz] = useToggleQuizMutation(); const navigate = useNavigate(); const loggedUser = getUser()!;
  const [isOverviewOpen, setIsOverviewOpen] = useState(false); const [isDeleteOpen, setIsDeleteOpen] = useState(false); const [isEditOpen, setIsEditOpen] = useState(false); const [isActionsOpen, setIsActionsOpen] = useState(false);
  const isStudent = loggedUser.role === "student"; const isAdmin = loggedUser.role === "admin";
  const toggle = async () => { try { await toggleQuiz(quiz._id).unwrap().then((res) => toast.success(res.message)); } catch (error) { toast.error(getApiErrorMessage(error, "Unable to update quiz")); } };
  return <>
    <article className="surface-card group relative overflow-hidden p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"><div className={`absolute inset-x-0 top-0 h-1 ${quiz.enabled ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"}`} />
      <div className="flex items-start justify-between gap-3"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${quiz.enabled ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}`}>{quiz.enabled ? "Live" : "Draft"}</span>{isAdmin && <span className="text-xs font-medium text-slate-500 dark:text-slate-400">by {quiz.createdBy?.username || "Faculty"}</span>}</div><h3 className="mt-3 text-lg font-bold leading-snug">{quiz.title}</h3><div className="mt-3 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400"><span className="inline-flex items-center gap-1.5"><FiClock aria-hidden="true" />{quiz.maxTime} min</span><span>{quiz.questions?.length || 0} questions</span></div></div>
        {isStudent ? <button type="button" aria-label={`Start ${quiz.title}`} onClick={() => navigate(`/student/${quiz._id}`)} className="icon-button shrink-0 bg-accent text-white hover:bg-violet-700 hover:text-white"><FiPlay aria-hidden="true" size={20} /></button> : <div className="relative"><button type="button" aria-label={`Actions for ${quiz.title}`} aria-expanded={isActionsOpen} onClick={() => setIsActionsOpen((open) => !open)} className="icon-button"><FiMoreHorizontal aria-hidden="true" size={20} /></button>{isActionsOpen && <div className="absolute right-0 z-20 mt-1 w-40 rounded-xl border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900">{isAdmin ? <button type="button" onClick={() => { setIsOverviewOpen(true); setIsActionsOpen(false); }} className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800">View overview</button> : <><button type="button" onClick={() => { setIsEditOpen(true); setIsActionsOpen(false); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"><FiEdit3 aria-hidden="true" />Edit quiz</button><button type="button" onClick={() => { navigate(`${quiz._id}`); setIsActionsOpen(false); }} className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800">Manage questions</button><button type="button" onClick={() => { setIsDeleteOpen(true); setIsActionsOpen(false); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950"><FiTrash2 aria-hidden="true" />Delete</button></>}</div>}</div>}</div>
      {!isStudent && !isAdmin && <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800"><span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Available to students</span><Toggle checked={quiz.enabled} onChange={toggle} /></div>}
    </article>
    {isOverviewOpen && <Modal title="Quiz overview" child={<QuizPage quiz={quiz} />} setIsOpen={setIsOverviewOpen} />}
    {isEditOpen && <Modal title="Edit quiz" child={<AddQuizForm isEdit closeModal={() => setIsEditOpen(false)} quiz={quiz} />} setIsOpen={setIsEditOpen} />}
    {isDeleteOpen && <Modal title="Delete quiz" child={<DeleteForm name={quiz.title} deleteHandler={async () => { await deleteQuiz(quiz._id).unwrap().then(() => setIsDeleteOpen(false)); }} closeModal={() => setIsDeleteOpen(false)} isLoading={isDeleting} />} setIsOpen={setIsDeleteOpen} />}
  </>;
};
