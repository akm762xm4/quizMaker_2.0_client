import { useState } from "react";
import { FiCheck, FiTrash2, FiX } from "react-icons/fi";
import { toast } from "sonner";
import { Modal } from "../../Components/Modal";
import { DeleteForm } from "../user/DeleteForm";
import { ErrorI } from "../../types";
import {
  Request,
  useApproveFacultyRequestMutation,
  useDeleteRejectedRequestMutation,
} from "./requestApi";

const getStatusStyles = (status: string) => {
  if (status === "approved") {
    return "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300";
  }
  if (status === "rejected") {
    return "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-300";
  }
  return "border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-300";
};

const getRequestDate = (request: Request) => {
  if (request.createdAt) {
    return new Date(request.createdAt);
  }
  // MongoDB ObjectIds start with a 4-byte timestamp in hex
  if (request._id.length >= 8) {
    return new Date(parseInt(request._id.slice(0, 8), 16) * 1000);
  }
  return undefined;
};

const formatRequestDate = (date?: Date) => {
  if (!date || Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const RequestItem: React.FC<{ request: Request }> = ({ request }) => {
  const [approve] = useApproveFacultyRequestMutation();
  const [deleteRequest, { isLoading: isDeleting }] =
    useDeleteRejectedRequestMutation();
  const [isOpen, setIsOpen] = useState(false);

  const isPending = request.status === "pending";
  const statusStyles = getStatusStyles(request.status);
  const formattedDate = formatRequestDate(getRequestDate(request));

  const handleRequest = async (action: string) => {
    try {
      const response = await approve({
        requestId: request._id,
        action,
      }).unwrap();
      toast.success(response.message);
    } catch (error) {
      toast.error((error as ErrorI)?.data?.error || "Something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteRequest(request._id).unwrap();
      toast.success(response.message);
      setIsOpen(false);
    } catch (error) {
      toast.error((error as ErrorI)?.data?.error || "Something went wrong");
    }
  };

  return (
    <>
      <article className="surface-card flex flex-col gap-4 p-4 transition hover:border-violet-300 hover:shadow-md dark:hover:border-violet-700 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-sm font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {request.username.slice(0, 1).toUpperCase()}
          </span>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate font-bold">{request.username}</h3>
              <span
                className={`rounded-full border px-2 py-0.5 text-[11px] font-bold capitalize ${statusStyles}`}
              >
                {request.status}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Requested {formattedDate}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {isPending ? (
            <>
              <button
                type="button"
                onClick={() => handleRequest("reject")}
                aria-label={`Reject ${request.username}`}
                className="grid h-10 w-10 place-items-center rounded-xl border border-rose-200 text-rose-600 transition hover:bg-rose-50 dark:border-rose-900 dark:text-rose-300 dark:hover:bg-rose-950"
              >
                <FiX size={18} />
              </button>
              <button
                type="button"
                onClick={() => handleRequest("approve")}
                aria-label={`Approve ${request.username}`}
                className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-white transition hover:bg-violet-700"
              >
                <FiCheck size={18} />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label={`Delete ${request.username} request`}
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-700 dark:hover:bg-rose-950"
            >
              <FiTrash2 size={17} />
            </button>
          )}
        </div>
      </article>

      {isOpen && (
        <Modal
          title="Remove request"
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
};
