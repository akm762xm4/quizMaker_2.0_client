import { toast } from "sonner";
import Toggle from "../../Components/Toggle";
import {
  useDeleteUserMutation,
  UserI,
  useToggleUserMutation,
} from "./usersApi";
import { MdEditNote, MdDelete } from "react-icons/md";
import { useState } from "react";
import { Modal } from "../../Components/Modal";
import { DeleteForm } from "./DeleteForm";
import { EditUserForm } from "./EditUserForm";
import { Badge } from "../../Components/Badge";

interface UserItemProps {
  user: UserI;
}

export const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [toggleUser] = useToggleUserMutation();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [hovering, setHovering] = useState(false);

  const onToggleChange = async () => {
    await toggleUser(user._id)
      .unwrap()
      .then((res) => toast.success(res.message));
  };

  const deleteUserHandler = async () => {
    await deleteUser(user?._id)
      .unwrap()
      .then(() => setIsDeleteOpen(false));
  };

  return (
    <>
      {/* Card */}
      <div
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 flex justify-between items-center transition-shadow hover:shadow-md"
      >
        {/* User Info */}
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-gray-900 text-lg">
            {user.username}
          </span>
          <Badge role={user.role} />
        </div>

        {/* Actions */}
        <div
          className={`flex items-center gap-3 ${
            !hovering
              ? "md:invisible md:opacity-0"
              : "md:visible md:opacity-100"
          } transition-opacity duration-300`}
        >
          {/* Edit */}
          <button
            onClick={() => setIsEditOpen(true)}
            title="Edit"
            className="text-gray-600 hover:text-accent transition"
          >
            <MdEditNote size={20} />
          </button>

          {/* Delete */}
          <button
            onClick={() => setIsDeleteOpen(true)}
            title="Delete"
            className="text-gray-600 hover:text-red-500 transition"
          >
            <MdDelete size={20} />
          </button>

          {/* Toggle */}
          <Toggle checked={user.isActive} onChange={onToggleChange} />
        </div>
      </div>

      {/* Modals */}
      {isEditOpen && (
        <Modal
          title="Edit User"
          child={
            <EditUserForm closeModal={() => setIsEditOpen(false)} user={user} />
          }
          setIsOpen={setIsEditOpen}
        />
      )}
      {isDeleteOpen && (
        <Modal
          title="Delete User"
          child={
            <DeleteForm
              deleteHandler={deleteUserHandler}
              closeModal={() => setIsDeleteOpen(false)}
              name={user.username}
              isLoading={isDeleting}
            />
          }
          setIsOpen={setIsDeleteOpen}
        />
      )}
    </>
  );
};
