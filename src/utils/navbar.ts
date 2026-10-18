// import { IconType } from "react-icons";

export const adminNavbar: Navbar[] = [
  { path: "/admin", name: "dashboard" },
  {
    path: "/admin/users",
    name: "users",
  },
  {
    path: "/admin/quizzes",
    name: "quizzes",
  },
  {
    path: "/admin/qbs",
    name: "question-banks",
  },
  {
    path: "/admin/results",
    name: "results",
  },
  {
    path: "/admin/requests",
    name: "requests",
  },
];

export const facultyNavbar: Navbar[] = [
  { path: "/faculty", name: "dashboard" },
  {
    path: "/faculty/quizzes",
    name: "quizzes",
  },
  {
    path: "/faculty/qbs",
    name: "question-banks",
  },
  {
    path: "/faculty/results",
    name: "results",
  },
];

export const studentNavbar: Navbar[] = [
  { path: "/student", name: "dashboard" },
  { path: "/student/quizzes", name: "quizzes" },
  { path: "/student/result", name: "results" },
];

interface Navbar {
  path: string;
  name: string;
  //   icon: IconType;
}
