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
import { ProtectedRoute } from "../Components/ProtectedRoute";
import { AdminDashboard, FacultyDashboard, StudentDashboard } from "../Components/Dashboard";

const Routing = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/">
        <Route index={true} path="" element={<Auth />} />
      </Route>
      <Route element={<ProtectedRoute roles={["admin"]} />}>
      <Route path="/admin/">
        <Route path="" index={true} element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="quizzes" index={true} element={<QuizzesAdm />} />
        <Route path="qbs" element={<QuestionBanks />} />
        <Route path="results" element={<ResultsAdmin />} />
        <Route path="requests" element={<Requests />} />
      </Route>
      </Route>
      <Route element={<ProtectedRoute roles={["faculty"]} />}>
      <Route path="/faculty/">
        <Route index={true} element={<FacultyDashboard />} />
        <Route path="quizzes" element={<QuizzesFclty />} />
        <Route path="quizzes/:quizId" element={<QuizDetail />} />
        <Route path="qbs/">
          <Route index={true} path="" element={<QuestionBanks />} />
          <Route path=":qBankId" element={<QBankPage />} />
        </Route>
        <Route path="results" element={<ResultsAdmin />} />
      </Route>
      </Route>
      <Route element={<ProtectedRoute roles={["student"]} />}>
      <Route path="/student/">
        <Route index={true} path="" element={<StudentDashboard />} />
        <Route path="quizzes" element={<GetQuizzes />} />
        <Route path=":quizId" element={<QuizAttempt />} />
        <Route path="result" element={<ResultsStudent />} />
      </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Routing;
