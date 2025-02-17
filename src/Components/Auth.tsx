import { useState } from "react";
import { LoginForm } from "../features/auth/LoginForm";
import { RegisterForm } from "../features/auth/RegisterForm";

export const Auth = () => {
  const [state, setState] = useState(0);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col p-2 gap-4 bg-primary rounded shadow-2xl shadow-accent">
        <div className="flex justify-around text-2xl ">
          <button
            className={`${state === 0 && "font-bold"}`}
            onClick={() => setState(0)}
          >
            Login
          </button>
          <button
            className={`${state === 1 && "font-bold"}`}
            onClick={() => setState(1)}
          >
            Register
          </button>
        </div>
        {state === 0 ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};
