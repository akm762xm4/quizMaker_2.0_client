import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterCredentials, useRegisterMutation } from "./authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setToken } from "../../utils/localStorage";
import { ErrorI } from "../../types";
import { useCheckExistingRequestQuery } from "../approveRequest/requestApi";
import { useState, useEffect } from "react";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useRegisterMutation();
  const { register, handleSubmit, watch } = useForm<RegisterCredentials>();
  const [username, setUsername] = useState("");

  const selectedRole = watch("role");
  const watchedUsername = watch("username");

  // Only run the query when we have a username and role is faculty
  const shouldCheckRequest = username && selectedRole === "faculty";

  const { data: existingRequest } = useCheckExistingRequestQuery(username, {
    skip: !shouldCheckRequest,
  });

  useEffect(() => {
    if (watchedUsername && selectedRole === "faculty") {
      setUsername(watchedUsername);
    } else if (selectedRole !== "faculty") {
      setUsername("");
    }
  }, [watchedUsername, selectedRole]);

  const onSubmit: SubmitHandler<RegisterCredentials> = async (values) => {
    if (!values.username || !values.password || !values.role) {
      toast.error("Please fill in all fields");
      return;
    }

    // Check if user already has a faculty request
    if (values.role === "faculty" && existingRequest?.hasRequest) {
      toast.error(existingRequest.message);
      return;
    }

    try {
      const res = await signUp(values).unwrap();
      toast.success(res.message);
      if (res?.user?.role) {
        setToken(res.user.token);
        const role = res.user.role;
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
      }
    } catch (error) {
      const err = error as ErrorI;
      toast.error(err?.data?.error);
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

        <div className="space-y-1">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select id="role" className="form-input" {...register("role")}>
            <option value="faculty">Faculty</option>
            <option value="student">Student</option>
          </select>
        </div>

        {selectedRole === "faculty" && existingRequest?.hasRequest && (
          <div
            className={`p-3 rounded-lg text-sm ${
              existingRequest.status === "pending"
                ? "bg-yellow-50 text-yellow-800 border border-yellow-200"
                : existingRequest.status === "approved"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {existingRequest.message}
          </div>
        )}

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
            disabled={
              isLoading ||
              (selectedRole === "faculty" && existingRequest?.hasRequest)
            }
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};
