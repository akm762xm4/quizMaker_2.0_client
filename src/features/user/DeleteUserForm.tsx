import { useDeleteUserMutation, UserI } from "./usersApi";

interface DeleteUserFormProps {
  user: UserI;
  closeModal: () => void;
}

export const DeleteUserForm: React.FC<DeleteUserFormProps> = ({
  user,
  closeModal,
}) => {
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async () => {
    await deleteUser(user._id)
      .unwrap()
      .then((res) => {
        console.log("Res::", res);
        closeModal();
      });
  };

  return (
    <form>
      <div className="flex flex-col gap-3">
        <div>
          Are you sure want to delete{" "}
          <span className="text-accent font-bold">{user.username}</span> ?
        </div>
        <div className="flex items-center justify-end gap-2 ">
          <button
            onClick={closeModal}
            className="bg-highlight p-1 px-2 rounded"
          >
            no
          </button>
          <button onClick={handleDelete} className="bg-accent p-1 px-2 rounded">
            yes
          </button>
        </div>
      </div>
    </form>
  );
};
