import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAddQuestionsMutation, useGetQuizByIdQuery } from "./quizApi";
import { useGetAllQBanksQuery } from "../qbank/qBankApi";
import { toast } from "sonner";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FiMinusCircle } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";

export const QuizDetail = () => {
  const { quizId } = useParams<{ quizId: string | undefined }>();
  const navigate = useNavigate();
  const { data: quiz, refetch } = useGetQuizByIdQuery(quizId);
  const { data: questionBanks } = useGetAllQBanksQuery();
  const [addQuestions, { isLoading: isAdding }] = useAddQuestionsMutation();
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
      return isSelected
        ? prev.filter((q) => q._id !== questionId)
        : [...prev, { _id: questionId, text: questionText }];
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
    const questionIds = { questionIds: selectedQuestions.map((q) => q._id) };

    try {
      await addQuestions({ quizId, questionIds }).unwrap();
      toast.success("Questions added successfully!");
      setSelectedQuestions([]);
      refetch();
    } catch {
      toast.error("Failed to add questions.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background text-text-primary">
      {/* Sidebar - Question Banks */}
      <aside className="w-full md:w-1/3 bg-secondary border-b md:border-b-0 md:border-r p-4 overflow-y-auto">
        <h2 className="section-heading">📚 Question Banks</h2>
        {questionBanks?.length ? (
          questionBanks.map((bank) => (
            <div
              key={bank._id}
              className="mb-3 rounded-lg bg-highlight/40 shadow-sm"
            >
              <div
                className="flex justify-between items-center px-3 py-2 cursor-pointer hover:bg-highlight/60 rounded-t-lg"
                onClick={() => handleToggleBank(bank._id)}
              >
                <span className="font-medium text-sm">{bank.title}</span>
                {expandedBanks.includes(bank._id) ? (
                  <IoIosArrowDown />
                ) : (
                  <IoIosArrowForward />
                )}
              </div>
              {expandedBanks.includes(bank._id) && (
                <ul className="px-4 pb-2 space-y-1">
                  {bank.questions.map((q) => (
                    <li key={q._id} className="flex gap-2 text-sm">
                      <input
                        title="Select"
                        type="checkbox"
                        checked={selectedQuestions.some(
                          (sel) => sel._id === q._id
                        )}
                        onChange={() => handleQuestionSelect(q._id, q.text)}
                      />
                      <span className="break-words">{q.text}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-text-secondary">
            No question banks available.
          </p>
        )}
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-2/3 p-4 md:p-6 overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              title="Back"
              className="text-text-secondary hover:text-accent transition"
            >
              <IoArrowBack size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold">{quiz?.title}</h1>
              <p className="text-sm text-text-secondary">
                Manage and add questions to this quiz
              </p>
            </div>
          </div>
        </div>

        {/* Existing Questions */}
        <section>
          <h2 className="text-lg font-semibold mb-2">📌 Existing Questions</h2>
          {quiz?.questions?.length ? (
            <ul className="bg-highlight/40 border rounded-lg divide-y text-sm shadow-sm">
              {quiz.questions.map((q) => (
                <li key={q._id} className="p-3">
                  {q.text}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-text-secondary">
              No questions in this quiz yet.
            </p>
          )}
        </section>

        {/* Selected Questions */}
        <section>
          <h2 className="text-lg font-semibold mb-2">➕ Selected Questions</h2>
          {selectedQuestions.length > 0 ? (
            <ul className="bg-highlight/40 border rounded-lg divide-y shadow-sm text-sm">
              {selectedQuestions.map((q) => (
                <li
                  key={q._id}
                  className="flex justify-between items-center p-3"
                >
                  <span>{q.text}</span>
                  <button
                    title="Remove"
                    onClick={() => handleRemoveSelected(q._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiMinusCircle size={18} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-text-secondary">
              No newly selected questions.
            </p>
          )}
        </section>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={handleRemoveAll}
            className="btn-outline"
            disabled={selectedQuestions.length === 0}
          >
            Clear All
          </button>
          <button
            onClick={handleAddQuestions}
            className="btn-primary disabled:opacity-50"
            disabled={selectedQuestions.length === 0 || isAdding}
          >
            {isAdding ? "Adding..." : "Add to Quiz"}
          </button>
        </div>
      </main>
    </div>
  );
};
