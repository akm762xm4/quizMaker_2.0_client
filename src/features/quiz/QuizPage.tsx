import { MdPerson, MdQuiz, MdTimer } from "react-icons/md";
import { Badge } from "../../Components/Badge";
import { formatTime } from "../../utils/dateTime";
import { Quiz } from "./quizApi";

interface QuizPageProps {
  quiz: Quiz;
}

export const QuizPage: React.FC<QuizPageProps> = ({ quiz }) => {
  return (
    <div className="bg-highlight/30 border border-highlight p-6 rounded-2xl shadow-modal w-full max-w-xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-1">
          {quiz.title}
        </h2>
        <p className="text-sm text-text-secondary">
          An overview of this quiz’s configuration.
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
        {/* Creator */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-primary shadow-sm">
          <MdPerson className="text-accent text-lg" />
          <div>
            <div className="text-muted-foreground">Created By</div>
            <div className="font-medium text-text-primary">
              {quiz.createdBy.username}
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-primary shadow-sm">
          <Badge
            title={quiz.enabled ? "Active" : "Inactive"}
            bg={quiz.enabled ? "bg-green-500/20" : "bg-red-500/20"}
          />
        </div>

        {/* Number of Questions */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-primary shadow-sm">
          <MdQuiz className="text-accent text-lg" />
          <div>
            <div className="text-muted-foreground">Total Questions</div>
            <div className="font-medium text-text-primary">
              {quiz.questions.length}
            </div>
          </div>
        </div>

        {/* Max Time */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-primary shadow-sm">
          <MdTimer className="text-accent text-lg" />
          <div>
            <div className="text-muted-foreground">Max Time</div>
            <div className="font-medium text-text-primary">
              {formatTime(quiz.maxTime)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
