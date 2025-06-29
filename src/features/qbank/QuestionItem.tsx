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
import { Badge } from "../../Components/Badge";

interface QuestionItemProps {
  question: QuestionI;
  qBankId: string;
}

export const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  qBankId,
}) => {
  const [updateQuestion, { isLoading: isUpdating }] =
    useUpdateQuestionMutation();
  const [deleteQuestion, { isLoading: isDeleting }] =
    useRemoveQuestionMutation();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const onSubmit = async (data: AddQuestionI) => {
    try {
      const formattedData = {
        ...data,
        correctOption: Number(data.correctOption),
      };
      await updateQuestion({
        questionId: question._id,
        patch: formattedData,
      })
        .unwrap()
        .then(() => {
          toast.success("Question updated successfully.");
          setIsEditOpen(false);
        });
    } catch (error) {
      const err = error as ErrorI;
      toast.error(err?.data?.error);
    }
  };

  const deleteQuestionHandler = async () => {
    await deleteQuestion({ qBankId, questionId: question._id })
      .unwrap()
      .then(() => {
        toast.success("Question deleted successfully.");
        setIsDeleteOpen(false);
      });
  };

  return (
    <>
      <div className="card p-4 rounded-lg shadow-sm flex flex-col gap-4 hover:shadow-md transition">
        {/* Question Title */}
        <div className="flex flex-col gap-2">
          <p className="font-medium text-sm md:text-base text-text-primary">
            {question.text}
          </p>

          {/* Category & Actions */}
          <div className="flex items-center justify-between">
            <Badge bg="bg-accent/10 text-accent" title={question.category} />
            <div className="flex items-center gap-2">
              <button
                title="Edit"
                onClick={() => setIsEditOpen(true)}
                className="text-text-secondary hover:text-accent transition"
              >
                <MdEdit size={20} />
              </button>
              <button
                title="Delete"
                onClick={() => setIsDeleteOpen(true)}
                className="text-text-secondary hover:text-danger transition"
              >
                <MdDelete size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-2">
          {question.options.map((option, index) => {
            const isCorrect = index === question.correctOption;
            return (
              <label
                key={option}
                className={`flex items-center gap-2 text-sm p-2 rounded-lg ${
                  isCorrect
                    ? "bg-accent/80 text-white"
                    : "bg-muted text-text-secondary"
                }`}
              >
                <input
                  type="radio"
                  checked={isCorrect}
                  readOnly
                  className="accent-black cursor-default"
                />
                {option}
              </label>
            );
          })}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <Modal
          title="Edit Question"
          setIsOpen={setIsEditOpen}
          child={
            <QuestionForm
              question={question}
              onSubmit={onSubmit}
              isLoading={isUpdating}
            />
          }
        />
      )}

      {/* Delete Modal */}
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
