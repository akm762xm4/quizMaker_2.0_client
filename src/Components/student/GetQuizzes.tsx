import { FiBookOpen, FiClock, FiPlay } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useGetAvailableQuizzesQuery } from "../../features/result/resultApi";
import { Loader } from "../Loader";
import { NoResult } from "../NoResult";

export const GetQuizzes = () => {
  const { data: quizzes, isLoading, isFetching } = useGetAvailableQuizzesQuery(); const navigate = useNavigate();
  if (isLoading || isFetching) return <Loader />; if (!quizzes?.length) return <NoResult message="No quizzes are available right now." />;
  return <div className="dashboard-page"><div className="mb-8"><p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">Assessment library</p><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Choose your next quiz</h1><p className="mt-2 text-slate-600 dark:text-slate-300">Set aside a few focused minutes, then show what you know.</p></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{quizzes.map((quiz) => <article key={quiz._id} className="surface-card flex flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-lg"><span className="grid h-11 w-11 place-items-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300"><FiBookOpen aria-hidden="true" size={21} /></span><h2 className="mt-5 text-lg font-bold">{quiz.title}</h2><div className="mt-3 flex gap-4 text-sm text-slate-500 dark:text-slate-400"><span className="inline-flex items-center gap-1.5"><FiClock aria-hidden="true" />{quiz.maxTime} min</span><span>{quiz.questions.length} questions</span></div><button type="button" onClick={() => navigate(`/student/${quiz._id}`)} className="btn-dashboard mt-6 w-full">Start quiz <FiPlay aria-hidden="true" size={16} /></button></article>)}</div></div>;
};
