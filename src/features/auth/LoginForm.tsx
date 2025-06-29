import { SubmitHandler, useForm } from "react-hook-form";
import { LoginCredentials, useLoginMutation } from "./authApi";
import { toast } from "sonner";
import { setToken } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ErrorI } from "../../types";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginCredentials>();
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<LoginCredentials> = async (values) => {
    if (!values.username || !values.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await login(values).unwrap();
      toast.success("Logged in!");
      setToken(res?.token);
      const role = jwtDecode<{ role: string }>(res.token)?.role;
      switch (role) {
        case "admin":
          navigate("/admin");
          break;
        case "faculty":
          navigate("/faculty");
          break;
        default:
          navigate("/student");
          break;
      }
    } catch (error) {
      const err = error as ErrorI;
      toast.error(err.data.error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white w-full rounded-xl p-4 sm:p-6 sm:border sm:border-gray-200 shadow-md"
      >
        <div className="space-y-1">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            className="form-input"
            {...register("username")}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="form-input"
            {...register("password")}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <button
            type="reset"
            className="btn-outline w-full sm:w-auto text-center"
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn-primary w-full sm:w-auto text-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};
