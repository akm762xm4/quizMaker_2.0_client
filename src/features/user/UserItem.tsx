import { toast } from "react-toastify";
import Toggle from "../../Components/Toggle";
import { UserI, useToggleUserMutation } from "./usersApi";
import { MdEditNote, MdDelete } from "react-icons/md";
import { useState } from "react";
import { Modal } from "../../Components/Modal";
import { DeleteUserForm } from "./DeleteUserForm";
import { EditUserForm } from "./EditUserForm";
import { Badge } from "../../Components/Badge";

interface UserItemProps {
  user: UserI;
}
export const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [toggleUser] = useToggleUserMutation();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const onToggleChange = async () => {
    await toggleUser(user._id)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      });
  };
  return (
    <>
      <div
        onMouseOver={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="flex flex-row items-center justify-between bg-primary p-2 rounded"
      >
        <span className="flex flex-col items-start gap-1">
          <span className="text-xl">{user.username}</span>
          <Badge role={user.role} />
        </span>

        {isHovering && (
          <span className="flex flex-row items-center gap-4">
            <button onClick={() => setIsEditOpen(true)} title="edit">
              <MdEditNote size={24} />
            </button>
            <button onClick={() => setIsDeleteOpen(true)} title="delete">
              <MdDelete size={24} />
            </button>
            <Toggle checked={user.isActive} onChange={onToggleChange} />
          </span>
        )}
      </div>
      {isEditOpen && (
        <Modal
          title="Edit"
          child={
            <EditUserForm closeModal={() => setIsEditOpen(false)} user={user} />
          }
          setIsOpen={setIsEditOpen}
        />
      )}
      {isDeleteOpen && (
        <Modal
          title="Delete"
          child={
            <DeleteUserForm
              user={user}
              closeModal={() => setIsDeleteOpen(false)}
            />
          }
          setIsOpen={setIsDeleteOpen}
        />
      )}
    </>
  );
};
