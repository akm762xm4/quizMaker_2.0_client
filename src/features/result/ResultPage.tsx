import { Result } from "./resultApi";

interface ResultPageProps {
  result: Result;
}

export const ResultPage: React.FC<ResultPageProps> = ({ result }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-card flex flex-col gap-6 w-full max-w-lg">
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-text-primary">
          {result.quizId.title}
        </h3>
        <p className="text-sm text-text-secondary">
          Student:{" "}
          <span className="font-medium">{result.studentId.username}</span>
        </p>
      </div>

      <div className="flex items-center justify-between bg-highlight p-4 rounded-md shadow-inner">
        <div className="flex flex-col text-sm">
          <span className="text-muted-foreground">Score</span>
          <span className="text-lg font-semibold text-text-primary">
            {result.score}
          </span>
        </div>
        <div className="flex flex-col text-sm">
          <span className="text-muted-foreground">Total Marks</span>
          <span className="text-lg font-semibold text-text-primary">
            {result.totalMarks}
          </span>
        </div>
      </div>

      <div className="text-sm text-text-secondary">
        <span className="font-medium">Attempted On: </span>
        {new Date(result.attemptedOn).toLocaleDateString()}
      </div>
    </div>
  );
};
