import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiUsers,
} from "react-icons/fi";
import { HiOutlineChartBar } from "react-icons/hi";
import { useGetAllUsersQuery } from "../features/user/usersApi";
import {
  useGetAllQuizzesQuery,
  useGetQuizzesQuery,
} from "../features/quiz/quizApi";
import {
  useGetAllResultsQuery,
  useGetAvailableQuizzesQuery,
  useGetStudentResultsQuery,
} from "../features/result/resultApi";

const Metric = ({
  label,
  value,
  detail,
  icon: Icon,
  tone = "violet",
}: {
  label: string;
  value: string | number;
  detail: string;
  icon: React.ElementType;
  tone?: "violet" | "emerald" | "rose";
}) => (
  <article className="surface-card group relative overflow-hidden p-5 transition hover:-translate-y-1 hover:shadow-lg">
    <div className="relative z-10 flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {label}
        </p>
        <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
      </div>
      <span
        className={`grid h-11 w-11 place-items-center rounded-xl ${tone === "emerald" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" : tone === "rose" ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300" : "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300"}`}
      >
        <Icon aria-hidden="true" size={21} />
      </span>
    </div>
    <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">
      {detail}
    </p>
  </article>
);

const ActivityBars = ({ values }: { values: number[] }) => (
  <div
    className="mt-6 flex h-32 items-end gap-2"
    aria-label="Activity overview chart"
  >
    {values.map((value, index) => (
      <div key={index} className="flex flex-1 flex-col justify-end">
        <div
          className="rounded-t-md bg-accent/80 dark:bg-violet-400"
          style={{ height: `${value}%` }}
        />
        <span className="mt-2 text-center text-[10px] text-slate-400">
          {["M", "T", "W", "T", "F", "S", "S"][index]}
        </span>
      </div>
    ))}
  </div>
);

const DashboardHeader = ({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) => (
  <div className="mb-8 max-w-3xl">
    <p className="section-rule max-w-md">{eyebrow}</p>
    <h1 className="mt-4 text-3xl font-bold tracking-[-.035em] sm:text-5xl">
      {title}
    </h1>
    <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
      {text}
    </p>
  </div>
);

export const AdminDashboard = () => {
  const { data: users = [] } = useGetAllUsersQuery();
  const { data: quizzes = [] } = useGetAllQuizzesQuery();
  const { data: results = [] } = useGetAllResultsQuery();
  const activeUsers = users.filter((user) => user.isActive).length;
  return (
    <div className="dashboard-page aurora-page p-4 rounded-[1.35rem] min-h-full pb-10">
      <DashboardHeader
        eyebrow="Administrator workspace"
        title="Your assessment program at a glance"
        text="Keep an eye on people, quiz activity, and learner outcomes."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          label="Active users"
          value={activeUsers}
          detail={`${users.length} people total`}
          icon={FiUsers}
        />
        <Metric
          label="Published quizzes"
          value={quizzes.filter((quiz) => quiz.enabled).length}
          detail={`${quizzes.length} quizzes in the catalogue`}
          icon={FiBookOpen}
          tone="violet"
        />
        <Metric
          label="Submissions"
          value={results.length}
          detail="Across all available quizzes"
          icon={FiCheckCircle}
          tone="emerald"
        />
        <Metric
          label="Faculty members"
          value={users.filter((user) => user.role === "faculty").length}
          detail="Content creators"
          icon={HiOutlineChartBar}
        />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_.85fr]">
        <section className="surface-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold">Submission activity</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                A simple weekly view of assessment engagement.
              </p>
            </div>
            <HiOutlineChartBar
              className="text-violet-600 dark:text-violet-300"
              size={24}
            />
          </div>
          <ActivityBars values={[32, 52, 38, 70, 48, 85, 62]} />
        </section>
        <section className="surface-card p-6">
          <h2 className="text-lg font-bold">Quick actions</h2>
          <div className="mt-4 space-y-2">
            <DashboardLink to="/admin/users" label="Manage users" />
            <DashboardLink to="/admin/quizzes" label="Review quizzes" />
            <DashboardLink to="/admin/results" label="View results" />
          </div>
        </section>
      </div>
    </div>
  );
};

const DashboardLink = ({ to, label }: { to: string; label: string }) => (
  <Link
    to={to}
    className="flex min-h-12 items-center justify-between rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:bg-violet-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-violet-950/40"
  >
    <span>{label}</span>
    <FiArrowUpRight aria-hidden="true" />
  </Link>
);

export const FacultyDashboard = () => {
  const { data: quizzes = [] } = useGetQuizzesQuery();
  const { data: results = [] } = useGetAllResultsQuery();
  const live = quizzes.filter((quiz) => quiz.enabled).length;
  return (
    <div className="dashboard-page">
      <DashboardHeader
        eyebrow="Faculty workspace"
        title="Build learning moments that measure"
        text="Create assessments, publish when ready, and watch learner progress."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Metric
          label="My quizzes"
          value={quizzes.length}
          detail="Drafts and published assessments"
          icon={FiBookOpen}
        />
        <Metric
          label="Live now"
          value={live}
          detail="Ready for learners"
          icon={FiCheckCircle}
          tone="emerald"
        />
        <Metric
          label="Responses"
          value={results.length}
          detail="All recorded submissions"
          icon={HiOutlineChartBar}
          tone="violet"
        />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_.85fr]">
        <section className="surface-card p-6">
          <h2 className="text-lg font-bold">Quiz readiness</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Publish the quizzes you are ready to share.
          </p>
          <div className="mt-5 space-y-3">
            {quizzes.slice(0, 4).map((quiz) => (
              <div
                key={quiz._id}
                className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800"
              >
                <span className="font-semibold">{quiz.title}</span>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-bold ${quiz.enabled ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" : "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300"}`}
                >
                  {quiz.enabled ? "Live" : "Draft"}
                </span>
              </div>
            ))}
          </div>
        </section>
        <section className="surface-card p-6">
          <h2 className="text-lg font-bold">Keep moving</h2>
          <div className="mt-4 space-y-2">
            <DashboardLink to="/faculty/quizzes" label="Manage quizzes" />
            <DashboardLink to="/faculty/qbs" label="Open question banks" />
            <DashboardLink to="/faculty/results" label="Review results" />
          </div>
        </section>
      </div>
    </div>
  );
};

export const StudentDashboard = () => {
  const { data: quizzes = [] } = useGetAvailableQuizzesQuery();
  const { data: results = [] } = useGetStudentResultsQuery();
  const average = results.length
    ? Math.round(
        results.reduce(
          (sum, result) => sum + (result.score / result.totalMarks) * 100,
          0,
        ) / results.length,
      )
    : 0;
  return (
    <div className="dashboard-page">
      <DashboardHeader
        eyebrow="Learner workspace"
        title="Ready for your next challenge?"
        text="See what is waiting for you and keep your learning momentum going."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Metric
          label="Available quizzes"
          value={quizzes.length}
          detail="Ready whenever you are"
          icon={FiBookOpen}
        />
        <Metric
          label="Completed"
          value={results.length}
          detail="Submitted attempts"
          icon={FiCheckCircle}
          tone="emerald"
        />
        <Metric
          label="Average score"
          value={`${average}%`}
          detail="Across completed quizzes"
          icon={HiOutlineChartBar}
        />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_.85fr]">
        <section className="surface-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold">Up next</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Choose a quiz and start when you are prepared.
              </p>
            </div>
            <FiClock
              className="text-violet-600 dark:text-violet-300"
              size={24}
            />
          </div>
          <div className="mt-5 space-y-3">
            {quizzes.slice(0, 3).map((quiz) => (
              <div
                key={quiz._id}
                className="flex flex-col gap-3 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between dark:bg-slate-800"
              >
                <span className="font-semibold">{quiz.title}</span>
                <Link to={`/student/${quiz._id}`} className="btn-dashboard">
                  Start quiz <FiArrowUpRight aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </section>
        <section className="surface-card p-6">
          <h2 className="text-lg font-bold">Your progress</h2>
          <ActivityBars values={[20, 45, 35, 70, 58, 78, 88]} />
          <DashboardLink to="/student/result" label="View all results" />
        </section>
      </div>
    </div>
  );
};
