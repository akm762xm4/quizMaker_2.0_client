import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAddQuestionsMutation, useGetQuizByIdQuery } from "./quizApi";
import { useGetAllQBanksQuery } from "../qbank/qBankApi";
import { toast } from "sonner";
import { FiChevronDown, FiChevronRight, FiMinusCircle, FiPlus, FiSave } from "react-icons/fi";
import { FiBookOpen, FiClipboard } from "react-icons/fi";
import { BackButton } from "../../Components/BackButton";

export const QuizDetail = () => {
  const { quizId } = useParams<{ quizId: string | undefined }>();
  const { data: quiz, refetch } = useGetQuizByIdQuery(quizId);
  const { data: questionBanks } = useGetAllQBanksQuery();
  const [addQuestions, { isLoading: isAdding }] = useAddQuestionsMutation();
  const [selectedQuestions, setSelectedQuestions] = useState<{ _id: string; text: string }[]>([]);
  const [expandedBanks, setExpandedBanks] = useState<string[]>([]);

  const handleToggleBank = (bankId: string) =>
    setExpandedBanks((prev) =>
      prev.includes(bankId) ? prev.filter((id) => id !== bankId) : [...prev, bankId]
    );

  const handleQuestionSelect = (questionId: string, questionText: string) =>
    setSelectedQuestions((prev) => {
      const isSelected = prev.some((q) => q._id === questionId);
      return isSelected
        ? prev.filter((q) => q._id !== questionId)
        : [...prev, { _id: questionId, text: questionText }];
    });

  const handleRemoveSelected = (questionId: string) =>
    setSelectedQuestions((prev) => prev.filter((q) => q._id !== questionId));

  const handleAddQuestions = async () => {
    if (!quizId || !selectedQuestions.length) return;
    try {
      await addQuestions({ quizId, questionIds: { questionIds: selectedQuestions.map((q) => q._id) } }).unwrap();
      toast.success(`${selectedQuestions.length} question(s) added to quiz.`);
      setSelectedQuestions([]);
      refetch();
    } catch {
      toast.error("Failed to add questions.");
    }
  };

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <BackButton label="Back to quizzes" />
          <div className="mt-4 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              <FiClipboard aria-hidden="true" size={22} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">
                Manage Questions
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                {quiz?.title ?? "Loading…"}
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {quiz?.questions?.length ?? 0} question(s) currently in this quiz
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        {/* ── Left: Question Banks picker ── */}
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <FiBookOpen aria-hidden="true" className="text-violet-600 dark:text-violet-300" />
            Question Banks
          </h2>
          <div className="space-y-3">
            {questionBanks?.length ? (
              questionBanks.map((bank) => (
                <div key={bank._id} className="surface-card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => handleToggleBank(bank._id)}
                    className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold transition hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <span>{bank.title}</span>
                    <span className="flex items-center gap-2 text-slate-400">
                      <span className="text-xs">{bank.questions?.length ?? 0} q</span>
                      {expandedBanks.includes(bank._id)
                        ? <FiChevronDown aria-hidden="true" />
                        : <FiChevronRight aria-hidden="true" />}
                    </span>
                  </button>
                  {expandedBanks.includes(bank._id) && (
                    <ul className="divide-y divide-slate-100 border-t border-slate-100 dark:divide-slate-800 dark:border-slate-800">
                      {bank.questions.map((q) => {
                        const alreadyInQuiz = quiz?.questions?.some((eq) => eq._id === q._id);
                        const isSelected = selectedQuestions.some((sq) => sq._id === q._id);
                        return (
                          <li key={q._id}>
                            <label
                              className={`flex cursor-pointer items-start gap-3 px-4 py-3 text-sm transition ${
                                alreadyInQuiz
                                  ? "cursor-not-allowed opacity-50"
                                  : "hover:bg-slate-50 dark:hover:bg-slate-800"
                              }`}
                            >
                              <input
                                type="checkbox"
                                disabled={alreadyInQuiz}
                                checked={isSelected}
                                onChange={() => handleQuestionSelect(q._id, q.text)}
                                className="themed-checkbox mt-0.5 shrink-0"
                              />
                              <span>{q.text}</span>
                              {alreadyInQuiz && (
                                <span className="ml-auto shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                                  Added
                                </span>
                              )}
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No question banks available. Create one first.
              </p>
            )}
          </div>
        </section>

        {/* ── Right: Existing + staging ── */}
        <div className="space-y-6">
          {/* Existing questions */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <FiClipboard aria-hidden="true" className="text-violet-600 dark:text-violet-300" />
              Existing Questions
            </h2>
            {quiz?.questions?.length ? (
              <ul className="surface-card divide-y divide-slate-100 overflow-hidden dark:divide-slate-800">
                {quiz.questions.map((q, i) => (
                  <li key={q._id} className="flex items-start gap-3 px-4 py-3 text-sm">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-violet-100 text-xs font-bold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                      {i + 1}
                    </span>
                    <span>{q.text}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="surface-card px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                No questions yet. Pick some from the banks on the left.
              </div>
            )}
          </section>

          {/* Staging area */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <FiPlus aria-hidden="true" className="text-emerald-600 dark:text-emerald-300" />
              Selected to Add
              {selectedQuestions.length > 0 && (
                <span className="ml-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  {selectedQuestions.length}
                </span>
              )}
            </h2>

            {selectedQuestions.length ? (
              <ul className="surface-card divide-y divide-slate-100 overflow-hidden dark:divide-slate-800">
                {selectedQuestions.map((q) => (
                  <li key={q._id} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                    <span>{q.text}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSelected(q._id)}
                      className="shrink-0 text-slate-400 hover:text-red-500 transition"
                      aria-label="Remove question"
                    >
                      <FiMinusCircle aria-hidden="true" size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="surface-card px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                Check questions from the banks to stage them here.
              </div>
            )}

            {/* Actions */}
            <div className="mt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedQuestions([])}
                disabled={!selectedQuestions.length}
                className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-300 px-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700"
              >
                Clear selection
              </button>
              <button
                type="button"
                onClick={handleAddQuestions}
                disabled={!selectedQuestions.length || isAdding}
                className="btn-dashboard disabled:opacity-50"
              >
                <FiSave aria-hidden="true" size={16} />
                {isAdding ? "Saving…" : "Add to quiz"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
