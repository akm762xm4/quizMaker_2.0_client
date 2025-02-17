import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterCredentials } from "../auth/authApi";
import { toast } from "react-toastify";
import { ErrorI } from "../../types";
import { useEditUserMutation, UserI } from "./usersApi";

interface EditUserFormProps {
  user: UserI;
  closeModal: () => void;
}

export const EditUserForm: React.FC<EditUserFormProps> = ({
  closeModal,
  user,
}) => {
  const { register, handleSubmit, setValue } = useForm<RegisterCredentials>();
  const [editUser] = useEditUserMutation();

  const onSubmit: SubmitHandler<RegisterCredentials> = async (values) => {
    if (!values.username || !values.role) {
      toast.error("fill all the fields!");
      return;
    }
    try {
      await editUser({ userId: user?._id, patch: values })
        .unwrap()
        .then((res) => {
          toast.success(res.message);
          closeModal();
        });
    } catch (error) {
      const err = error as ErrorI;
      toast.error(err?.data?.error);
    }
  };

  useEffect(() => {
    setValue("username", user!.username);
    setValue("role", user!.role);
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <span className="flex gap-2">
          <label htmlFor="username">Username</label>
          <input
            className="bg-highlight px-1 outline-none rounded ml-auto"
            id="username"
            type="text"
            {...register("username")}
          />
        </span>
        <span className="flex gap-2">
          <label htmlFor="role">Role</label>
          <select
            className="bg-highlight px-1 outline-none rounded ml-auto"
            id="role"
            {...register("role")}
          >
            <option defaultChecked value="faculty">
              Faculty
            </option>
            <option value="student">Student</option>
          </select>
        </span>
        <span className="ml-auto flex gap-1">
          <button className="bg-accent p-1 rounded" type="reset">
            Reset
          </button>
          <button className="bg-accent p-1 rounded" type="submit">
            Submit
          </button>
        </span>
      </div>
    </form>
  );
};
