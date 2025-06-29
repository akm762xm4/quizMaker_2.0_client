import { useState } from "react";
import { LoginForm } from "../features/auth/LoginForm";
import { RegisterForm } from "../features/auth/RegisterForm";

export const Auth = () => {
  const [state, setState] = useState<0 | 1>(0); // 0 = Login, 1 = Register

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-primary">
      <div className="w-full max-w-md sm:border sm:border-gray-200 sm:rounded-2xl sm:shadow-lg p-4 sm:p-6 bg-white">
        {/* Toggle Tabs */}
        <div className="flex justify-between mb-6 border-b border-gray-200">
          {["Login", "Register"].map((label, index) => (
            <button
              key={label}
              className={`w-1/2 pb-2 text-center text-sm sm:text-lg font-medium transition-all ${
                state === index
                  ? "text-accent border-b-2 border-accent"
                  : "text-gray-500 hover:text-accent"
              }`}
              onClick={() => setState(index as 0 | 1)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Form Component */}
        {state === 0 ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};
