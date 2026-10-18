import { useGetStudentResultsQuery } from "../../features/result/resultApi";
import { ResultItem } from "../../features/result/ResultItem";
import Loader from "../Loader";
import { NoResult } from "../NoResult";
import { FiAward, FiBookOpen, FiTrendingUp } from "react-icons/fi";

export const Results = () => {
  const { data: results, isLoading, isFetching } = useGetStudentResultsQuery();

  if (isLoading || isFetching) return <Loader />;
  if (!results?.length)
    return <NoResult message="You haven't attempted any quizzes yet. Head to the quiz library to get started." />;

  const avg = Math.round(
    results.reduce((s, r) => s + (r.score / r.totalMarks) * 100, 0) / results.length
  );
  const best = Math.max(...results.map((r) => Math.round((r.score / r.totalMarks) * 100)));

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">
          Your progress
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Quiz Results</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Track your performance and see where you can improve.
        </p>
      </div>

      {/* Summary cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="surface-card p-5">
          <FiBookOpen className="text-violet-600 dark:text-violet-300" size={20} />
          <p className="mt-3 text-2xl font-bold">{results.length}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Quizzes attempted</p>
        </div>
        <div className="surface-card p-5">
          <FiTrendingUp className="text-violet-600 dark:text-violet-300" size={20} />
          <p className="mt-3 text-2xl font-bold">{avg}%</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Average score</p>
        </div>
        <div className="surface-card p-5">
          <FiAward className="text-emerald-600 dark:text-emerald-300" size={20} />
          <p className="mt-3 text-2xl font-bold">{best}%</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Personal best</p>
        </div>
      </div>

      {/* Results grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {results.map((result) => (
          <ResultItem key={result._id} result={result} />
        ))}
      </div>
    </div>
  );
};
