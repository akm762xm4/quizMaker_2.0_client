import { useNavigate, useParams } from "react-router-dom";
import {
  AddQuestionI,
  useAddQuestionMutation,
  useGetQBankByIdQuery,
} from "./qBankApi";
import { QuestionItem } from "./QuestionItem";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { Modal } from "../../Components/Modal";
import { QuestionForm } from "./QuestionForm";
import { toast } from "sonner";
import { ErrorI } from "../../types";
import { IoArrowBack } from "react-icons/io5"; // Back icon
import { Loader } from "../../Components/Loader";
import { NoResult } from "../../Components/NoResult";

export const QBankPage = () => {
  const navigate = useNavigate();
  const [addQuestion, { isLoading: isAdding }] = useAddQuestionMutation();
  const { qBankId } = useParams<{ qBankId: string | undefined }>();
  const { data: qBank, isLoading } = useGetQBankByIdQuery(qBankId);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);

  const onSubmit = async (values: AddQuestionI) => {
    try {
      const formattedValues = {
        ...values,
        correctOption: Number(values.correctOption),
      };
      await addQuestion({ qBankId: qBankId, body: formattedValues })
        .unwrap()
        .then((res) => {
          toast.success(res.message);
          setIsAddOpen(false);
        });
    } catch (error) {
      const err = error as ErrorI;
      toast.error(err?.data?.error);
    }
  };

  if (isLoading) return <Loader />;

  if (!isLoading && !qBank)
    return <NoResult message="Question bank not found." />;

  return (
    <>
      <div className="min-h-screen page-container py-6">
        {/* Header */}
        <div className="card mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Left: Back + Title */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="text-text-secondary hover:text-accent transition"
                title="Back"
              >
                <IoArrowBack size={22} />
              </button>
              <div className="flex flex-col">
                <h1 className="text-xl md:text-2xl font-bold text-text-primary">
                  {qBank?.title || "Untitled Question Bank"}
                </h1>
                <p className="text-sm text-text-secondary">
                  Total Questions: {qBank?.questions?.length || 0}
                </p>
              </div>
            </div>

            {/* Right: Add Button */}
            <button
              title="Add Question"
              onClick={() => setIsAddOpen(true)}
              className="btn-outline flex items-center gap-2"
            >
              <FaPlus className="text-accent" />
              <span className="text-sm font-medium text-text-secondary">
                Add Question
              </span>
            </button>
          </div>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {qBank?.questions.map((question) => (
            <QuestionItem
              key={question._id}
              qBankId={qBank._id}
              question={question}
            />
          ))}
        </div>
      </div>

      {/* Add Question Modal */}
      {isAddOpen && (
        <Modal
          title="Add Question"
          setIsOpen={setIsAddOpen}
          child={
            <QuestionForm
              onSubmit={(data) => onSubmit(data)}
              isLoading={isAdding}
            />
          }
        />
      )}
    </>
  );
};
