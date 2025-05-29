import { Result } from "./resultApi";

interface ResultPageProps {
  result: Result;
}
export const ResultPage: React.FC<ResultPageProps> = ({ result }) => {
  return (
    <div className="flex flex-col bg-secondary/20 p-4 rounded-lg shadow-md gap-4">
      <div className="flex flex-row justify-between bg-highlight rounded-lg items-center">
        <span className="flex flex-col p-2 gap-2">
          <span>{result.quizId.title}</span>
          <span>{result.studentId.username}</span>
        </span>
        <span className="flex flex-col bg-accent/70 p-4 rounded-r-lg divide-secondary divide-y">
          <span>{result.score}</span>
          <span>{result.totalMarks}</span>
        </span>
      </div>
      <div className="text-sm md:text-base">
        <span>attempted On:</span>
        <span>{new Date(result?.attemptedOn).toDateString()}</span>
      </div>
    </div>
  );
};
