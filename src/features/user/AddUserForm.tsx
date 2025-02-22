import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ErrorI } from "../../types";
import { RegisterCredentials } from "../auth/authApi";
import { useCreateUserMutation } from "./usersApi";

interface AddUserFormProps {
  closeModal: () => void;
}

export const AddUserForm: React.FC<AddUserFormProps> = ({ closeModal }) => {
  const { register, handleSubmit } = useForm<RegisterCredentials>();
  const [createUser] = useCreateUserMutation();

  const onSubmit: SubmitHandler<RegisterCredentials> = async (values) => {
    if (!values.username || !values.password || !values.role) {
      toast.error("fill all the fields!");
      return;
    }
    try {
      await createUser(values)
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
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 bg-highlight/40 p-4 rounded-lg shadow-md">
        <span className="flex gap-2">
          <label htmlFor="username">Username</label>
          <input
            className="bg-highlight/50 px-1 outline-none rounded ml-auto"
            id="username"
            type="text"
            {...register("username")}
          />
        </span>

        <span className="flex gap-2">
          <label htmlFor="password">Password</label>
          <input
            className="bg-highlight/50 px-1 outline-none rounded ml-auto"
            id="password"
            type="password"
            {...register("password")}
          />
        </span>

        <span className="flex gap-2">
          <label htmlFor="role">Role</label>
          <select
            className="bg-highlight/50 px-1 outline-none rounded ml-auto"
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
          <button className="bg-highlight p-1 rounded" type="reset">
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
