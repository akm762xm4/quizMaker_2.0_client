import { MdDelete, MdEdit } from "react-icons/md";
import {
  AddQuestionI,
  QuestionI,
  useRemoveQuestionMutation,
  useUpdateQuestionMutation,
} from "./qBankApi";
import { useState } from "react";
import { Modal } from "../../Components/Modal";
import { QuestionForm } from "./QuestionForm";
import { DeleteForm } from "../user/DeleteForm";
import { toast } from "sonner";
import { ErrorI } from "../../types";
import { FiCheck } from "react-icons/fi";

interface QuestionItemProps {
  question: QuestionI;
  qBankId: string;
}

export const QuestionItem: React.FC<QuestionItemProps> = ({ question, qBankId }) => {
  const [updateQuestion, { isLoading: isUpdating }] = useUpdateQuestionMutation();
  const [deleteQuestion, { isLoading: isDeleting }] = useRemoveQuestionMutation();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const onSubmit = async (data: AddQuestionI) => {
    try {
      const formattedData = { ...data, correctOption: Number(data.correctOption) };
      await updateQuestion({ questionId: question._id, patch: formattedData }).unwrap();
      toast.success("Question updated.");
      setIsEditOpen(false);
    } catch (error) {
      toast.error((error as ErrorI)?.data?.error || "Failed to update question.");
    }
  };

  const deleteQuestionHandler = async () => {
    await deleteQuestion({ qBankId, questionId: question._id })
      .unwrap()
      .then(() => {
        toast.success("Question deleted.");
        setIsDeleteOpen(false);
      });
  };

  return (
    <>
      <article className="surface-card flex flex-col gap-4 p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
        {/* Question text + category badge + actions */}
        <div className="flex items-start justify-between gap-3">
          <p className="font-semibold leading-snug">{question.text}</p>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              title="Edit"
              onClick={() => setIsEditOpen(true)}
              className="icon-button h-9 w-9 text-slate-500 hover:text-violet-600 dark:hover:text-violet-300"
            >
              <MdEdit aria-hidden="true" size={18} />
            </button>
            <button
              type="button"
              title="Delete"
              onClick={() => setIsDeleteOpen(true)}
              className="icon-button h-9 w-9 text-slate-500 hover:text-red-600 dark:hover:text-red-400"
            >
              <MdDelete aria-hidden="true" size={18} />
            </button>
          </div>
        </div>

        {/* Category chip */}
        <span className="self-start rounded-full bg-violet-100 px-2.5 py-1 text-xs font-bold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
          {question.category}
        </span>

        {/* Options */}
        <div className="space-y-2">
          {question.options.map((option, index) => {
            const isCorrect = index === question.correctOption;
            return (
              <div
                key={option}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                  isCorrect
                    ? "border-emerald-400 bg-emerald-50 font-semibold text-emerald-700 dark:border-emerald-500 dark:bg-emerald-950 dark:text-emerald-300"
                    : "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs font-bold ${
                    isCorrect
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-slate-300 text-slate-400 dark:border-slate-600"
                  }`}
                >
                  {isCorrect ? <FiCheck aria-hidden="true" /> : String.fromCharCode(65 + index)}
                </span>
                {option}
              </div>
            );
          })}
        </div>
      </article>

      {isEditOpen && (
        <Modal
          title="Edit Question"
          setIsOpen={setIsEditOpen}
          child={<QuestionForm question={question} onSubmit={onSubmit} isLoading={isUpdating} />}
        />
      )}
      {isDeleteOpen && (
        <Modal
          title="Delete Question"
          setIsOpen={setIsDeleteOpen}
          child={
            <DeleteForm
              closeModal={() => setIsDeleteOpen(false)}
              name="question"
              deleteHandler={deleteQuestionHandler}
              isLoading={isDeleting}
            />
          }
        />
      )}
    </>
  );
};
