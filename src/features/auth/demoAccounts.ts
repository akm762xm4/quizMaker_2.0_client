export type DemoAccount = {
  role: "admin" | "faculty" | "student";
  username: string;
  password: string;
  summary: string;
  capabilities: string[];
};

// These are intentionally public, resettable accounts for a hosted portfolio demo.
// Override them in the deployment environment if your demo seed uses different names.
export const demoAccounts: DemoAccount[] = [
  {
    role: "admin",
    username: import.meta.env.VITE_DEMO_ADMIN_USERNAME || "demo-admin",
    password: import.meta.env.VITE_DEMO_ADMIN_PASSWORD || "DemoPass123!",
    summary: "Review users, faculty requests, quizzes, and outcomes.",
    capabilities: ["User management", "Faculty approvals", "Results overview"],
  },
  {
    role: "faculty",
    username: import.meta.env.VITE_DEMO_FACULTY_USERNAME || "demo-faculty",
    password: import.meta.env.VITE_DEMO_FACULTY_PASSWORD || "DemoPass123!",
    summary: "Build question banks and publish a timed assessment.",
    capabilities: ["Question banks", "Quiz builder", "Class results"],
  },
  {
    role: "student",
    username: import.meta.env.VITE_DEMO_STUDENT_USERNAME || "demo-student",
    password: import.meta.env.VITE_DEMO_STUDENT_PASSWORD || "DemoPass123!",
    summary: "Take a live quiz and see a scored result.",
    capabilities: ["Available quizzes", "Timed attempt", "My results"],
  },
];
