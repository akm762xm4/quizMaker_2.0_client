import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAddQuestionsMutation, useGetQuizByIdQuery } from "./quizApi";
import { useGetAllQBanksQuery } from "../qbank/qBankApi";
import { toast } from "react-toastify";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FiMinusCircle } from "react-icons/fi";

export const QuizDetail = () => {
  const { quizId } = useParams<{ quizId: string | undefined }>();
  const { data: quiz, refetch } = useGetQuizByIdQuery(quizId); // Refetch after adding/removing
  const { data: questionBanks } = useGetAllQBanksQuery();
  const [addQuestions] = useAddQuestionsMutation();
  const [selectedQuestions, setSelectedQuestions] = useState<
    { _id: string; text: string }[]
  >([]);
  const [expandedBanks, setExpandedBanks] = useState<string[]>([]);

  const handleToggleBank = (bankId: string) => {
    setExpandedBanks((prev) =>
      prev.includes(bankId)
        ? prev.filter((id) => id !== bankId)
        : [...prev, bankId]
    );
  };

  const handleQuestionSelect = (questionId: string, questionText: string) => {
    setSelectedQuestions((prev) => {
      const isSelected = prev.some((q) => q._id === questionId);
      if (isSelected) {
        return prev.filter((q) => q._id !== questionId); // Remove if already selected
      } else {
        return [...prev, { _id: questionId, text: questionText }]; // Add if not selected
      }
    });
  };

  const handleRemoveSelected = (questionId: string) => {
    setSelectedQuestions((prev) => prev.filter((q) => q._id !== questionId));
  };

  const handleRemoveAll = () => {
    setSelectedQuestions([]);
  };

  const handleAddQuestions = async () => {
    if (!quizId || selectedQuestions.length === 0) return;

    const questionIds = { questionIds: selectedQuestions.map((q) => q._id) }; // Extract IDs for the backend

    try {
      // console.log("IDS::", questionIds);

      await addQuestions({ quizId, questionIds }).unwrap();
      toast.success("Questions added successfully!");
      setSelectedQuestions([]); // Clear the selected questions
      refetch(); // Refresh quiz data
    } catch (error) {
      toast.error("Failed to add questions.");
    }
  };

  return (
    <div className="flex h-screen bg-primary">
      {/* Sidebar - Question Banks */}
      <div className="w-1/3 bg-secondary border-r p-4 overflow-y-auto">
        <div className="text-xl font-semibold mb-2">Question Banks</div>
        {questionBanks?.length ? (
          questionBanks.map((bank) => (
            <div
              key={bank._id}
              className="border p-2 my-2 bg-primary rounded-lg"
            >
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => handleToggleBank(bank._id)}
              >
                <span className="font-medium">{bank.title}</span>
                {expandedBanks.includes(bank._id) ? (
                  <IoIosArrowDown />
                ) : (
                  <IoIosArrowForward />
                )}
              </div>

              {expandedBanks.includes(bank._id) && (
                <ul className="ml-4">
                  {bank.questions.map((q) => (
                    <li
                      key={q._id}
                      className="flex items-center gap-2 py-1 text-sm"
                    >
                      <input
                        title="select"
                        type="checkbox"
                        checked={selectedQuestions.some(
                          (selected) => selected._id === q._id
                        )}
                        onChange={() => handleQuestionSelect(q._id, q.text)} // Pass both _id and text
                      />
                      {q.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <p>No question banks available.</p>
        )}
      </div>

      <div className="w-2/3 p-6">
        <h1 className="text-xl font-bold">
          {quiz?.title} - Selected Questions
        </h1>

        {/* Existing Questions in the Quiz */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Existing Questions in Quiz</h2>
          {quiz?.questions?.length ? (
            <ul className="border rounded-lg shadow-md p-2 bg-highlight/40">
              {quiz.questions.map((q) => (
                <li
                  key={q._id}
                  className="flex justify-between items-center p-3 border-b border-secondary last:border-none"
                >
                  <span>{q.text}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center p-4 text-gray-500">
              No questions in this quiz yet.
            </p>
          )}
        </div>

        {/* Newly Selected Questions */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Newly Selected Questions</h2>
          {selectedQuestions.length > 0 ? (
            <ul className="border rounded-lg shadow-md p-2 bg-highlight/40">
              {selectedQuestions.map((q) => (
                <li
                  key={q._id}
                  className="flex justify-between items-center p-3 border-b border-secondary last:border-none"
                >
                  <span>{q.text}</span> {/* Display question text */}
                  <button
                    title="remove"
                    onClick={() => handleRemoveSelected(q._id)}
                  >
                    <FiMinusCircle size={22} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center p-4 text-gray-500">
              No newly selected questions.
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-2">
          <button
            className="bg-highlight/50 p-2 rounded ml-auto"
            onClick={handleRemoveAll}
            disabled={selectedQuestions.length === 0}
          >
            Remove All
          </button>
          <button
            className="bg-accent/80 p-2 rounded"
            onClick={handleAddQuestions}
            disabled={selectedQuestions.length === 0}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
