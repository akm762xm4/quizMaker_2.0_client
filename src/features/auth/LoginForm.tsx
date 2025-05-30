import { SubmitHandler, useForm } from "react-hook-form";
import { LoginCredentials, useLoginMutation } from "./authApi";
import { toast } from "react-toastify";
import { setToken } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ErrorI } from "../../types";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginCredentials>();
  const [login] = useLoginMutation();
  const onSubmit: SubmitHandler<LoginCredentials> = async (values) => {
    if (!values.username || !values.password) {
      toast.error("fill all the fields!");
      return;
    }
    try {
      await login(values)
        .unwrap()
        .then((res) => {
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
        });
    } catch (error) {
      const err = error as ErrorI;
      toast.error(err.data.error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 bg-highlight/40 p-4 rounded-lg shadow-md ">
        <span className="flex flex-col md:flex-row gap-2 text-sm md:text-base">
          <label htmlFor="username">Username</label>
          <input
            className="bg-highlight/50 p-1 outline-none rounded md:ml-auto"
            id="username"
            type="text"
            {...register("username")}
          />
        </span>
        <span className="flex flex-col md:flex-row gap-2 text-sm md:text-base">
          <label htmlFor="password">Password</label>
          <input
            className="bg-highlight/50 p-1 outline-none rounded md:ml-auto"
            id="password"
            type="password"
            {...register("password")}
          />
        </span>
        <span className="ml-auto flex gap-1 text-sm md:text-base">
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
