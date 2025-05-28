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
import { toast } from "react-toastify";
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
  const [updateQuestion] = useUpdateQuestionMutation();
  const [deleteQuestion] = useRemoveQuestionMutation();
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

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
        .then((res) => {
          toast.success(res?.message);
          setIsEditOpen(false);
        });
    } catch (error) {
      const err = error as ErrorI;
      toast.error(err?.data?.error);
    }
  };

  const deleteQuestionHandler = async () => {
    await deleteQuestion({ qBankId: qBankId, questionId: question._id });
  };

  return (
    <>
      <div className="bg-primary rounded-lg p-4 shadow-md ">
        {/* Question Text */}
        <span className="flex flex-col gap-2">
          <p className="font-medium text-lg ">{question.text}</p>
          <span className="flex items-center justify-between pb-4">
            <Badge bg="bg-red-500/40" title={question.category} />
            <span className="flex flex-row gap-2">
              <button title="edit" onClick={() => setIsDeleteOpen(true)}>
                <MdDelete size={24} />
              </button>
              <button title="edit" onClick={() => setIsEditOpen(true)}>
                <MdEdit size={24} />
              </button>
            </span>
          </span>
        </span>

        {/* Options */}
        <div className="flex flex-col gap-2">
          {question.options.map((option, index) => (
            <label
              key={option}
              className={`flex items-center gap-2 p-2 rounded ${
                index == question?.correctOption
                  ? "bg-accent"
                  : "bg-gray-800/20"
              }`}
            >
              <input
                type="radio"
                name={`question-${question._id}`}
                value={option}
                checked={index == question.correctOption}
                className="accent-black"
                readOnly
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      {isEditOpen && (
        <Modal
          title="Edit Question"
          setIsOpen={setIsEditOpen}
          child={
            <QuestionForm
              question={question}
              onSubmit={(data) => onSubmit(data)}
            />
          }
        />
      )}
      {isDeleteOpen && (
        <Modal
          title="delete Question"
          setIsOpen={setIsDeleteOpen}
          child={
            <DeleteForm
              closeModal={() => setIsDeleteOpen(false)}
              name="question"
              deleteHandler={deleteQuestionHandler}
            />
          }
        />
      )}
    </>
  );
};
