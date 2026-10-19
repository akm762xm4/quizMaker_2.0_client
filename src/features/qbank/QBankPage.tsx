import { useParams } from "react-router-dom";
import {
  AddQuestionI,
  useAddQuestionMutation,
  useGetQBankByIdQuery,
} from "./qBankApi";
import { QuestionItem } from "./QuestionItem";
import { useState } from "react";
import { Modal } from "../../Components/Modal";
import { QuestionForm } from "./QuestionForm";
import { toast } from "sonner";
import { getApiErrorMessage } from "../../utils/apiError";
import { Loader } from "../../Components/Loader";
import { NoResult } from "../../Components/NoResult";
import { BackButton } from "../../Components/BackButton";
import { FiPlus } from "react-icons/fi";
import { FiBookOpen } from "react-icons/fi";

export const QBankPage = () => {
  const [addQuestion, { isLoading: isAdding }] = useAddQuestionMutation();
  const { qBankId } = useParams<{ qBankId: string | undefined }>();
  const { data: qBank, isLoading } = useGetQBankByIdQuery(qBankId);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);

  const onSubmit = async (values: AddQuestionI) => {
    try {
      const formattedValues = { ...values, correctOption: Number(values.correctOption) };
      await addQuestion({ qBankId, body: formattedValues })
        .unwrap()
        .then((res) => {
          toast.success(res.message);
          setIsAddOpen(false);
        });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to add question."));
    }
  };

  if (isLoading) return <Loader />;
  if (!isLoading && !qBank) return <NoResult message="Question bank not found." />;

  return (
    <>
      <div className="dashboard-page">
        {/* Page header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <BackButton label="Back to question banks" />
            <div className="mt-4 flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                <FiBookOpen aria-hidden="true" size={22} />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">
                  Question Bank
                </p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                  {qBank?.title || "Untitled Bank"}
                </h1>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {qBank?.questions?.length ?? 0} question
                  {qBank?.questions?.length !== 1 ? "s" : ""} in this bank
                </p>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsAddOpen(true)}
            className="btn-dashboard self-start sm:self-auto"
          >
            <FiPlus aria-hidden="true" size={18} />
            Add Question
          </button>
        </div>

        {/* Questions grid */}
        {qBank?.questions?.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {qBank.questions.map((question) => (
              <QuestionItem key={question._id} qBankId={qBank._id} question={question} />
            ))}
          </div>
        ) : (
          <NoResult message="No questions yet. Add your first question above." />
        )}
      </div>

      {isAddOpen && (
        <Modal
          title="Add Question"
          setIsOpen={setIsAddOpen}
          child={<QuestionForm onSubmit={onSubmit} isLoading={isAdding} />}
        />
      )}
    </>
  );
};
