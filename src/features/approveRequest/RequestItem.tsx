import { useState } from "react";
import { Badge } from "../../Components/Badge";
import {
  Request,
  useApproveFacultyRequestMutation,
  useDeleteRejectedRequestMutation,
} from "./requestApi";
import { IoClose, IoCheckmark, IoTrash } from "react-icons/io5";
import { toast } from "sonner";
import { getApiErrorMessage } from "../../utils/apiError";
import { DeleteForm } from "../user/DeleteForm";
import { Modal } from "../../Components/Modal";

interface RequestItemProps {
  request: Request;
}

export const RequestItem: React.FC<RequestItemProps> = ({ request }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [approve] = useApproveFacultyRequestMutation();
  const [deleteRequest, { isLoading: isDeleting }] =
    useDeleteRejectedRequestMutation();
  const [isOpen, setIsOpen] = useState(false);
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
};
