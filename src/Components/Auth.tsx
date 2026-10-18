import { useState } from "react";
import { LoginForm } from "../features/auth/LoginForm";
import { RegisterForm } from "../features/auth/RegisterForm";
import { DemoAccount, demoAccounts } from "../features/auth/demoAccounts";

export const Auth = () => {
  const [state, setState] = useState<0 | 1>(0); // 0 = Login, 1 = Register
  const [selectedDemo, setSelectedDemo] = useState<DemoAccount>();

  const selectDemo = (account: DemoAccount) => {
    setState(0);
    setSelectedDemo(account);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid items-center gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        {/* Left: hero */}
        <section className="max-w-2xl">
          <div className="mb-6 flex items-center gap-3">
            <img
              src="/quizmaker_logo_mark.svg"
              alt="QuizMaker logo"
              className="h-10 w-10 shrink-0"
            />
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-400 pt-2.5">
              QuizMaker 2.0
            </p>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-5xl">
            See every side of a smarter assessment workflow.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
            Explore the same role-based experience used by administrators,
            faculty, and students. Demo accounts use safe sample data and are
            designed for a quick, no-setup tour.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {demoAccounts.map((account) => (
              <button
                key={account.role}
                type="button"
                aria-pressed={selectedDemo?.role === account.role}
                onClick={() => selectDemo(account)}
                className={`min-h-28 rounded-2xl border p-4 text-left shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  selectedDemo?.role === account.role
                    ? "border-accent bg-accent text-white shadow-violet-200 dark:shadow-violet-900"
                    : "border-slate-200 bg-white text-slate-900 hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-violet-600"
                }`}
              >
                <span className="block text-sm font-bold capitalize">
                  {account.role} demo
                </span>
                <span
                  className={`mt-2 block text-xs leading-5 ${selectedDemo?.role === account.role ? "text-violet-100" : "text-slate-500 dark:text-slate-400"}`}
                >
                  {account.summary}
                </span>
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Select a role to prefill the sign-in form, then log in to take the
            guided tour.
          </p>
        </section>

        {/* Right: form card */}
        <section className="w-full rounded-3xl border border-slate-200 bg-white p-2 shadow-xl shadow-violet-100/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-violet-900/20">
          <div className="rounded-2xl bg-white p-4 dark:bg-slate-900 sm:p-6">
            {selectedDemo && state === 0 && (
              <div
                className="mb-5 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-950 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-200"
                role="status"
              >
                <span className="font-bold capitalize">
                  {selectedDemo.role} demo selected.
                </span>{" "}
                Credentials are ready below.
              </div>
            )}
            {/* Toggle Tabs */}
            <div className="flex justify-between mb-6 border-b border-slate-200 dark:border-slate-700">
              {["Login", "Register"].map((label, index) => (
                <button
                  key={label}
                  className={`w-1/2 pb-2 text-center text-sm sm:text-base font-medium transition-all ${
                    state === index
                      ? "text-accent border-b-2 border-accent"
                      : "text-slate-500 hover:text-accent dark:text-slate-400 dark:hover:text-violet-400"
                  }`}
                  onClick={() => {
                    setState(index as 0 | 1);
                    if (index === 1) setSelectedDemo(undefined);
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            {state === 0 ? (
              <LoginForm demoAccount={selectedDemo} />
            ) : (
              <RegisterForm />
            )}
          </div>
        </section>
      </div>
    </main>
  );
};
