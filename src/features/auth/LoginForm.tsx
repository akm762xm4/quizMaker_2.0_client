import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginCredentials, useLoginMutation } from "./authApi";
import { toast } from "sonner";
import { getUser, setToken } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "../../utils/apiError";
import { DemoAccount } from "./demoAccounts";

export const LoginForm = ({ demoAccount }: { demoAccount?: DemoAccount }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<LoginCredentials>();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (demoAccount) {
      reset({ username: demoAccount.username, password: demoAccount.password });
    }
  }, [demoAccount, reset]);

  const onSubmit: SubmitHandler<LoginCredentials> = async (values) => {
    if (!values.username || !values.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await login(values).unwrap();

      if (!res?.token) {
        toast.error("Login failed: the server did not return a session token.");
        return;
      }

      if (!setToken(res.token)) {
        toast.error(
          "Login succeeded, but this browser is blocking local storage, so the session can't be saved."
        );
        return;
      }

      const user = getUser();
      if (!user) {
        toast.error(
          "Login succeeded, but the session token could not be read. Please try again."
        );
        return;
      }

      toast.success("Logged in!");
      switch (user.role) {
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
      toast.error(
        getApiErrorMessage(error, "Login failed. Please check your credentials.")
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            className="form-input"
            autoComplete="username"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="next"
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
            autoComplete="current-password"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="go"
            {...register("password")}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-2 pt-1">
          <button type="reset" className="btn-outline w-full sm:w-auto text-center">Reset</button>
          <button type="submit" className="btn-primary w-full sm:w-auto text-center disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
    </form>
  );
};
