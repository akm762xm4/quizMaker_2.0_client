import { toast } from "react-toastify";
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
  const [deleteUser] = useDeleteUserMutation();
  const [toggleUser] = useToggleUserMutation();
  const [isHovering, setIsHovering] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const onToggleChange = async () => {
    await toggleUser(user._id)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      });
  };

  const deleteUserHandler = async () => {
    await deleteUser(user?._id)
      .unwrap()
      .then(() => setIsDeleteOpen(false));
  };

  return (
    <>
      <div
        onMouseOver={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="flex flex-row items-center justify-between bg-primary p-2 rounded text-sm md:text-base"
      >
        <span className="flex flex-col items-start gap-1">
          <span className="text-lg md:text-xl">{user.username}</span>
          <Badge role={user.role} />
        </span>

        <span
          className={`flex flex-row items-center gap-2 md:gap-4 ${
            !isHovering && "flex md:hidden"
          }`}
        >
          <button
            onClick={() => setIsEditOpen(true)}
            title="edit"
            className="text-xl md:text-2xl"
          >
            <MdEditNote size={24} />
          </button>
          <button onClick={() => setIsDeleteOpen(true)} title="delete">
            <MdDelete size={24} />
          </button>
          <Toggle checked={user.isActive} onChange={onToggleChange} />
        </span>
      </div>
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
            />
          }
          setIsOpen={setIsDeleteOpen}
        />
      )}
    </>
  );
};
