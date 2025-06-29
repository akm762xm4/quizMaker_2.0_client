import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ErrorI } from "../../types";
import { RegisterCredentials } from "../auth/authApi";
import { useCreateUserMutation } from "./usersApi";

interface AddUserFormProps {
  closeModal: () => void;
}

export const AddUserForm: React.FC<AddUserFormProps> = ({ closeModal }) => {
  const { register, handleSubmit } = useForm<RegisterCredentials>();
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();

  const onSubmit: SubmitHandler<RegisterCredentials> = async (values) => {
    if (!values.username || !values.password || !values.role) {
      toast.error("Fill all the fields!");
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
      <div className="card flex flex-col gap-4">
        {/* Username */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <label htmlFor="username" className="text-muted-foreground md:w-28">
            Username
          </label>
          <input id="username" type="text" {...register("username")} />
        </div>

        {/* Password */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <label htmlFor="password" className="text-muted-foreground md:w-28">
            Password
          </label>
          <input id="password" type="password" {...register("password")} />
        </div>

        {/* Role */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <label htmlFor="role" className="text-muted-foreground md:w-28">
            Role
          </label>
          <select id="role" {...register("role")}>
            <option defaultChecked value="faculty">
              Faculty
            </option>
            <option value="student">Student</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button type="reset" className="btn-outline">
            Reset
          </button>
          <button
            type="submit"
            className="btn-primary disabled:opacity-50"
            disabled={isCreating}
          >
            {isCreating ? "Creating..." : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
};
