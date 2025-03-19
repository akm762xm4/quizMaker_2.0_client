import { useParams } from "react-router-dom";
import { useGetQuizByIdQuery } from "./quizApi";

export const QuizInfo = () => {
  const { quizId } = useParams();
  const { data: quiz } = useGetQuizByIdQuery(quizId);
  console.log("QiuzId::", quiz);

  return <div>Hh</div>;
};
