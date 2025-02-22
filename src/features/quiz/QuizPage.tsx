import { Badge } from "../../Components/Badge";
import { formatTime } from "../../utils/dateTime";
import { Quiz } from "./quizApi";

interface QuizPageProps {
  quiz: Quiz;
}

export const QuizPage: React.FC<QuizPageProps> = ({ quiz }) => {
  return (
    <div className="bg-highlight/40 p-4 rounded-lg shadow-md w-full max-w-md">
      <div className="grid grid-cols-2 gap-y-3 text-sm text-secondary/80">
        <span className="font-medium">Created By:</span>
        <span className="text-secondary font-semibold">
          {quiz.createdBy.username}
        </span>

        <span className="font-medium">Status:</span>
        <Badge
          title={quiz.enabled ? "Active" : "Inactive"}
          bg={quiz.enabled ? "bg-green-500/50" : "bg-red-500/50"}
        />

        <span className="font-medium">Questions:</span>
        <span className="font-semibold">{quiz.questions.length}</span>

        <span className="font-medium">Max Time:</span>
        <span className="font-semibold">{formatTime(quiz.maxTime)}</span>
      </div>
    </div>
  );
};
