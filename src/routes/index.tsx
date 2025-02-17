import { Routes, Route, useLocation } from "react-router-dom";
import { Auth } from "../Components/Auth";
import { AdminPage } from "../Components/admin/AdminPage";
import { Users } from "../Components/admin/Users";
import { Quizzes as QuizzesAdm } from "../Components/admin/Quizzes";
import { Quizzes as QuizzesFclty } from "../Components/Faculty/Quizzes";
// import { UserDetail } from "../features/user/UserDetail";

const Routing = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/">
        <Route index={true} path="" element={<Auth />} />
      </Route>
      <Route path="/admin/">
        <Route path="" index={true} element={<Users />} />
        <Route path="quizzes" index={true} element={<QuizzesAdm />} />

        {/* <Route path="quizzes" index={true} element={<Users />} /> */}
      </Route>{" "}
      <Route path="/faculty/">
        <Route index={true} element={<QuizzesFclty />} />
      </Route>
      //admin Routes
      <Route path="*" element={<AdminPage />} />
    </Routes>
  );
};

export default Routing;
