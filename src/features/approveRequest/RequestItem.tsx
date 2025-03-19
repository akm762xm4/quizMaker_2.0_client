import { useState } from "react";
import { Badge } from "../../Components/Badge";
import { Request, useApproveFacultyRequestMutation } from "./requestApi";
import { IoClose, IoCheckmark } from "react-icons/io5";
import { toast } from "react-toastify";
import { ErrorI } from "../../types";

interface RequestItemProps {
  request: Request;
}
export const RequestItem: React.FC<RequestItemProps> = ({ request }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [approve] = useApproveFacultyRequestMutation();
  const handleRequest = async (action: string) => {
    try {
      await approve({ requestId: request._id, action: action })
        .unwrap()
        .then((res) => toast.success(res.message));
    } catch (error) {
      const err = error as ErrorI;
      toast.error(err?.data?.error);
    }
  };
  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="bg-primary p-2 rounded flex flex-row items-center justify-between"
    >
      <span className="flex flex-col">
        <span className="text-xl">{request.username}</span>
        <Badge bg="bg-red-500/40" title={request.status} />
      </span>
      <span
        className={`${
          isHovering ? "visible" : "hidden"
        } flex items-center gap-2`}
      >
        <button
          onClick={() => handleRequest("reject")}
          className="bg-red-500 p-1 rounded-lg"
          title="reject"
        >
          <IoClose size={30} />
        </button>
        <button
          onClick={() => handleRequest("approve")}
          className=" bg-green-500 p-1 rounded-lg "
          title="approve"
        >
          <IoCheckmark size={30} />
        </button>
      </span>
    </div>
  );
};
