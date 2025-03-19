import { Routes, Route, useLocation } from "react-router-dom";
import { Auth } from "../Components/Auth";
import { AdminPage } from "../Components/admin/AdminPage";
import { Users } from "../Components/admin/Users";
import { Quizzes as QuizzesAdm } from "../Components/admin/Quizzes";
import { Quizzes as QuizzesFclty } from "../Components/Faculty/Quizzes";
import { QuestionBanks } from "../Components/admin/QuestionBanks";
import { Results } from "../Components/admin/Results";
import { QBankPage } from "../features/qbank/QBankPage";
import { GetQuizzes } from "../Components/student/GetQuizzes";
import { QuizDetail } from "../features/quiz/QuizDetail";
import { ViewQuiz } from "../features/quiz/ViewQuiz";
import { Requests } from "../features/approveRequest/Requests";

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
        <Route path="results" element={<Results />} />
        <Route path="requests" element={<Requests />} />
      </Route>
      //faculty routes
      <Route path="/faculty/">
        <Route index={true} element={<QuizzesFclty />} />
        <Route path=":quizId" element={<QuizDetail />} />
        <Route path="view/:quizId" element={<ViewQuiz />} />
        <Route path="qbs/">
          <Route index={true} path="" element={<QuestionBanks />} />
          <Route path=":qBankId" element={<QBankPage />} />
        </Route>
        <Route path="results" element={<Results />} />
      </Route>
      //student routes
      <Route path="/student/">
        <Route index={true} path="" element={<GetQuizzes />} />
      </Route>
      <Route path="*" element={<AdminPage />} />
    </Routes>
  );
};

export default Routing;
