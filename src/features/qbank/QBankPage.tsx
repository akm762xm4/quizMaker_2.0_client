import { useParams } from "react-router-dom";
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
import { toast } from "react-toastify";
import { ErrorI } from "../../types";

export const QBankPage = () => {
  const [addQuestion] = useAddQuestionMutation();
  const { qBankId } = useParams<{ qBankId: string | undefined }>();
  const { data: qBank } = useGetQBankByIdQuery(qBankId);
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

  return (
    <>
      <div className="bg-secondary min-h-screen p-6">
        {/* Title Section */}
        <div className="flex items-center justify-between bg-primary p-4 rounded-lg mb-6 shadow-md">
          <span className=" text-2xl font-semibold ">{qBank?.title}</span>
          <button title="add" onClick={() => setIsAddOpen(true)}>
            <FaPlus size={24} />
          </button>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {qBank?.questions.map((question) => (
            <QuestionItem
              key={question._id}
              qBankId={qBank._id}
              question={question}
            />
          ))}
        </div>
      </div>
      {isAddOpen && (
        <Modal
          title="Add Question"
          setIsOpen={setIsAddOpen}
          child={<QuestionForm onSubmit={(data) => onSubmit(data)} />}
        />
      )}
    </>
  );
};
