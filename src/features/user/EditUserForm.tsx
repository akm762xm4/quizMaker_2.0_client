import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterCredentials } from "../auth/authApi";
import { toast } from "sonner";
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
  const [editUser, { isLoading: isEditing }] = useEditUserMutation();

  const onSubmit: SubmitHandler<RegisterCredentials> = async (values) => {
    if (!values.username || !values.role) {
      toast.error("Fill all the fields!");
      return;
    }
    try {
      await editUser({ userId: user._id, patch: values })
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
    setValue("username", user.username);
    setValue("role", user.role);
  }, [setValue, user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="form-group">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          id="username"
          type="text"
          {...register("username")}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="role" className="form-label">
          Role
        </label>
        <select id="role" {...register("role")} className="form-input">
          <option value="faculty">Faculty</option>
          <option value="student">Student</option>
        </select>
      </div>

      <div className="flex justify-end gap-3">
        <button type="reset" className="btn-outline">
          Reset
        </button>
        <button
          type="submit"
          className="btn-solid bg-accent text-white hover:opacity-90 disabled:opacity-50"
          disabled={isEditing}
        >
          {isEditing ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
};
