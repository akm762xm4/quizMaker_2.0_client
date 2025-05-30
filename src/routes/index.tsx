import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Auth } from "../Components/Auth";
import { Users } from "../Components/admin/Users";
import { Quizzes as QuizzesAdm } from "../Components/admin/Quizzes";
import { Quizzes as QuizzesFclty } from "../Components/Faculty/Quizzes";
import { QuestionBanks } from "../Components/admin/QuestionBanks";
import { Results as ResultsAdmin } from "../Components/admin/Results";
import { Results as ResultsStudent } from "../Components/student/Results";
import { QBankPage } from "../features/qbank/QBankPage";
import { GetQuizzes } from "../Components/student/GetQuizzes";
import { QuizDetail } from "../features/quiz/QuizDetail";
import { Requests } from "../features/approveRequest/Requests";
import QuizAttempt from "../Components/student/QuizAttempt";

const Routing = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/">
        <Route index={true} path="" element={<Auth />} />
      </Route>
      //admin routes
      <Route path="/admin/">
        <Route path="" index={true} element={<Users />} />
        <Route path="quizzes" index={true} element={<QuizzesAdm />} />
        <Route path="qbs" element={<QuestionBanks />} />
        <Route path="results" element={<ResultsAdmin />} />
        <Route path="requests" element={<Requests />} />
      </Route>
      //faculty routes
      <Route path="/faculty/">
        <Route index={true} element={<QuizzesFclty />} />
        <Route path=":quizId" element={<QuizDetail />} />
        <Route path="qbs/">
          <Route index={true} path="" element={<QuestionBanks />} />
          <Route path=":qBankId" element={<QBankPage />} />
        </Route>
        <Route path="results" element={<ResultsAdmin />} />
      </Route>
      //student routes
      <Route path="/student/">
        <Route index={true} path="" element={<GetQuizzes />} />
        <Route path=":quizId" element={<QuizAttempt />} />
        <Route path="result" element={<ResultsStudent />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Routing;
