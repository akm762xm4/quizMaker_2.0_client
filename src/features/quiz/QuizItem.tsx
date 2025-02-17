import { Quiz } from "./quizApi";

interface QuizItemProps {
  quiz: Quiz;
}

export const QuizItem: React.FC<QuizItemProps> = ({ quiz }) => {
  return (
    <div className="bg-primary p-2 rounded flex">
      <div className="flex flex-col">
        <span className="text-xl font-bold">{quiz.title}</span>
        <span className="text-sm">{quiz.class}</span>
      </div>
      <div></div>
    </div>
  );
};
