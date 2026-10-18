import { useState } from "react";
import { Result, useDeleteResultMutation } from "./resultApi";
import { MdDelete } from "react-icons/md";
import { Modal } from "../../Components/Modal";
import { DeleteForm } from "../user/DeleteForm";
import { ResultPage } from "./ResultPage";
import { FiAward, FiCalendar, FiChevronRight, FiUser } from "react-icons/fi";

interface ResultItemProps {
  result: Result;
}

export const ResultItem: React.FC<ResultItemProps> = ({ result }) => {
  const [deleteResult, { isLoading: isDeleting }] = useDeleteResultMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const deleteResultHandler = async () => {
    await deleteResult(result._id).unwrap().then(() => setIsDeleteOpen(false));
  };

  const pct = Math.round((result.score / result.totalMarks) * 100);
  const tone =
    pct >= 80
      ? "emerald"
      : pct >= 50
      ? "violet"
      : "rose";

  const toneClasses = {
    emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    violet: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
    rose: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  } as const;

  const barClasses = {
    emerald: "bg-emerald-500",
    violet: "bg-accent",
    rose: "bg-rose-500",
  } as const;

  return (
    <>
      <article className="surface-card group overflow-hidden transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
        {/* Score bar at top */}
        <div className="h-1 w-full bg-slate-100 dark:bg-slate-800">
          <div
            className={`h-full ${barClasses[tone]} transition-all`}
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            {/* Main info */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="min-w-0 text-left"
            >
              <h3 className="truncate font-bold hover:text-violet-600 dark:hover:text-violet-300 transition">
                {result.quizId.title}
              </h3>
              <div className="mt-2 space-y-1">
                <p className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                  <FiUser aria-hidden="true" size={13} />
                  {result.studentId.username}
                </p>
                <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <FiCalendar aria-hidden="true" size={12} />
                  {new Date(result.attemptedOn).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </button>

            {/* Score badge + delete */}
            <div className="flex shrink-0 flex-col items-end gap-3">
              <span className={`rounded-full px-3 py-1.5 text-sm font-bold ${toneClasses[tone]}`}>
                <FiAward className="inline mr-1" aria-hidden="true" />
                {result.score}/{result.totalMarks}
              </span>
              <button
                type="button"
                onClick={() => setIsDeleteOpen(true)}
                title="Delete result"
                className="icon-button h-8 w-8 text-slate-400 hover:text-red-600 dark:hover:text-red-400"
              >
                <MdDelete aria-hidden="true" size={18} />
              </button>
            </div>
          </div>

          {/* Percentage + view CTA */}
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
            <span className={`text-xs font-bold ${toneClasses[tone]} rounded-full px-2 py-0.5`}>
              {pct}%
            </span>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 transition"
            >
              View details <FiChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </article>

      {isModalOpen && (
        <Modal
          title={`Result — ${result.studentId.username}`}
          child={<ResultPage result={result} />}
          setIsOpen={setIsModalOpen}
        />
      )}
      {isDeleteOpen && (
        <Modal
          title="Delete Result"
          setIsOpen={setIsDeleteOpen}
          child={
            <DeleteForm
              name="result"
              deleteHandler={deleteResultHandler}
              closeModal={() => setIsDeleteOpen(false)}
              isLoading={isDeleting}
            />
          }
        />
      )}
    </>
  );
};
