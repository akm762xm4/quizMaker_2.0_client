import { useParams } from "react-router-dom";

export const ViewQuiz = () => {
  const { quizId } = useParams();
  return <div>View Quiz {quizId}</div>;
};
