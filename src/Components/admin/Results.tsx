import { useState } from "react";
import { useGetAllResultsQuery } from "../../features/result/resultApi";
import { ResultItem } from "../../features/result/ResultItem";
import { NoResult } from "../NoResult";
import Loader from "../Loader";
import { FiSearch } from "react-icons/fi";

export const Results = () => {
  const { data: results, isLoading, isFetching } = useGetAllResultsQuery();
  const [search, setSearch] = useState("");

  if (isLoading || isFetching) return <Loader />;
  if (!results?.length) return <NoResult message="No results recorded yet." />;

  const filtered = results.filter(
    (r) =>
      r.quizId.title.toLowerCase().includes(search.toLowerCase()) ||
      r.studentId.username.toLowerCase().includes(search.toLowerCase())
  );

  const avg = results.length
    ? Math.round(results.reduce((s, r) => s + (r.score / r.totalMarks) * 100, 0) / results.length)
    : 0;

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">
          Assessment data
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Quiz Results</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Review learner performance across all published assessments.
        </p>
      </div>

      {/* Summary strip */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="surface-card p-5">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total attempts</p>
          <p className="mt-2 text-3xl font-bold">{results.length}</p>
        </div>
        <div className="surface-card p-5">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Average score</p>
          <p className="mt-2 text-3xl font-bold">{avg}%</p>
        </div>
        <div className="surface-card p-5">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pass rate (≥50%)</p>
          <p className="mt-2 text-3xl font-bold">
            {Math.round(
              (results.filter((r) => r.score / r.totalMarks >= 0.5).length / results.length) * 100
            )}
            %
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="surface-card mb-6 flex items-center gap-3 p-3">
        <FiSearch aria-hidden="true" size={18} className="text-slate-400" />
        <input
          type="search"
          placeholder="Search by quiz or student name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="!border-0 !bg-transparent !p-1 !ring-0 text-sm"
          aria-label="Search results"
        />
      </div>

      {/* Grid */}
      {filtered.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((result) => (
            <ResultItem key={result._id} result={result} />
          ))}
        </div>
      ) : (
        <NoResult message={`No results match "${search}".`} />
      )}
    </div>
  );
};
