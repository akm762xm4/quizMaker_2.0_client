import { useState } from "react";
import { FiCheck, FiTrash2, FiX } from "react-icons/fi";
import { toast } from "sonner";
<<<<<<< HEAD
=======
import { getApiErrorMessage } from "../../utils/apiError";
import { DeleteForm } from "../user/DeleteForm";
>>>>>>> 324340f1b187f7b0fe0e7c1cde17cda2406728d8
import { Modal } from "../../Components/Modal";
import { DeleteForm } from "../user/DeleteForm";
import { ErrorI } from "../../types";
import { Request, useApproveFacultyRequestMutation, useDeleteRejectedRequestMutation } from "./requestApi";

export const RequestItem: React.FC<{ request: Request }> = ({ request }) => {
  const [approve] = useApproveFacultyRequestMutation();
  const [deleteRequest, { isLoading: isDeleting }] = useDeleteRejectedRequestMutation();
  const [isOpen, setIsOpen] = useState(false);
<<<<<<< HEAD
  const isPending = request.status === "pending";
  const statusStyles = request.status === "approved" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300" : request.status === "rejected" ? "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-300" : "border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-300";
  const handleRequest = async (action: string) => { try { const response = await approve({ requestId: request._id, action }).unwrap(); toast.success(response.message); } catch (error) { toast.error((error as ErrorI)?.data?.error || "Something went wrong"); } };
  const handleDelete = async () => { try { const response = await deleteRequest(request._id).unwrap(); toast.success(response.message); setIsOpen(false); } catch (error) { toast.error((error as ErrorI)?.data?.error || "Something went wrong"); } };
  const fallbackDate = request._id.length >= 8 ? new Date(parseInt(request._id.slice(0, 8), 16) * 1000) : undefined;
  const requestDate = request.createdAt ? new Date(request.createdAt) : fallbackDate;
  const formattedDate = requestDate && !Number.isNaN(requestDate.getTime()) ? requestDate.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "Date unavailable";
  return <>
    <article className="surface-card flex flex-col gap-4 p-4 transition hover:border-violet-300 hover:shadow-md dark:hover:border-violet-700 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <div className="flex min-w-0 items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-sm font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{request.username.slice(0, 1).toUpperCase()}</span><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="truncate font-bold">{request.username}</h3><span className={`rounded-full border px-2 py-0.5 text-[11px] font-bold capitalize ${statusStyles}`}>{request.status}</span></div><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Requested {formattedDate}</p></div></div>
      <div className="flex items-center gap-2 self-end sm:self-auto">{isPending ? <><button type="button" onClick={() => handleRequest("reject")} aria-label={`Reject ${request.username}`} className="grid h-10 w-10 place-items-center rounded-xl border border-rose-200 text-rose-600 transition hover:bg-rose-50 dark:border-rose-900 dark:text-rose-300 dark:hover:bg-rose-950"><FiX size={18} /></button><button type="button" onClick={() => handleRequest("approve")} aria-label={`Approve ${request.username}`} className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-white transition hover:bg-violet-700"><FiCheck size={18} /></button></> : <button type="button" onClick={() => setIsOpen(true)} aria-label={`Delete ${request.username} request`} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-700 dark:hover:bg-rose-950"><FiTrash2 size={17} /></button>}</div>
    </article>
    {isOpen && <Modal title="Remove request" setIsOpen={setIsOpen} child={<DeleteForm deleteHandler={handleDelete} name={request.username} closeModal={() => setIsOpen(false)} isLoading={isDeleting} />} />}
  </>;
=======
  const handleRequest = async (action: string) => {
    try {
      const res = await approve({ requestId: request._id, action }).unwrap();
      toast.success(res.message);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Something went wrong."));
    }
  };

  const handleDelete = async () => {
    try {
      const res = await deleteRequest(request._id).unwrap();
      toast.success(res.message);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Something went wrong."));
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="surface-card flex items-center justify-between gap-4 p-4 sm:p-5 hover:shadow-md transition"
      >
        {/* Info Section */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h3 className="text-base md:text-lg font-semibold text-text-primary">
              {request.username}
            </h3>
            <Badge
              title={request.status}
              bg={
                request.status === "pending"
                  ? "bg-yellow-500/40 text-yellow-800 dark:text-yellow-200"
                  : request.status === "approved"
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                  : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
              }
            />
          </div>
          {request.createdAt && (
            <p className="text-sm text-text-secondary">
              Requested on: {formatDate(request.createdAt)}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div
          className={`flex items-center gap-2 transition-opacity duration-200 ${
            !isHovering && "opacity-0 md:opacity-100"
          }`}
        >
          {request.status === "pending" && (
            <>
              <button
                onClick={() => handleRequest("reject")}
                className="bg-danger text-white p-2 rounded hover:bg-red-600 transition"
                title="Reject"
              >
                <IoClose size={18} />
              </button>
              <button
                onClick={() => handleRequest("approve")}
                className="bg-success text-white p-2 rounded hover:bg-emerald-600 transition"
                title="Approve"
              >
                <IoCheckmark size={18} />
              </button>
            </>
          )}

          {(request.status === "approved" || request.status === "rejected") && (
            <button
              onClick={() => setIsOpen(true)}
              className={`p-2 text-white rounded transition ${
                request.status === "rejected"
                  ? "bg-danger hover:bg-red-700"
                  : "bg-accent hover:bg-violet-700"
              }`}
              title="Delete Request"
            >
              <IoTrash size={18} />
            </button>
          )}
        </div>
      </div>
      {isOpen && (
        <Modal
          title="Delete Quiz"
          setIsOpen={setIsOpen}
          child={
            <DeleteForm
              deleteHandler={handleDelete}
              name={request.username}
              closeModal={() => setIsOpen(false)}
              isLoading={isDeleting}
            />
          }
        />
      )}
    </>
  );
>>>>>>> 324340f1b187f7b0fe0e7c1cde17cda2406728d8
};
