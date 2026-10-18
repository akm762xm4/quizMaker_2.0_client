import { Result } from "./resultApi";
import { FiAward, FiBookOpen, FiCalendar, FiUser } from "react-icons/fi";

interface ResultPageProps {
  result: Result;
}

export const ResultPage: React.FC<ResultPageProps> = ({ result }) => {
  const pct = Math.round((result.score / result.totalMarks) * 100);
  const tone = pct >= 80 ? "emerald" : pct >= 50 ? "violet" : "rose";

  const ringClass = {
    emerald: "stroke-emerald-500",
    violet: "",
    rose: "stroke-rose-500",
  }[tone];

  const ringStyle = tone === "violet" ? { stroke: "#7c3aed" } : {};

  const labelClass = {
    emerald: "text-emerald-600 dark:text-emerald-300",
    violet: "text-violet-600 dark:text-violet-300",
    rose: "text-rose-600 dark:text-rose-300",
  }[tone];

  // SVG donut
  const r = 40;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div className="flex flex-col gap-6">
      {/* Quiz title */}
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
          <FiBookOpen aria-hidden="true" size={20} />
        </span>
        <div>
          <h3 className="font-bold text-lg leading-snug">{result.quizId.title}</h3>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">Assessment result</p>
        </div>
      </div>

      {/* Score donut + stats */}
      <div className="grid grid-cols-2 gap-4">
        {/* Donut chart */}
        <div className="surface-card flex flex-col items-center justify-center py-6">
          <svg width="100" height="100" viewBox="0 0 100 100" aria-label={`Score: ${pct}%`}>
            <circle cx="50" cy="50" r={r} fill="none" stroke="currentColor" strokeWidth="10" className="text-slate-100 dark:text-slate-800" />
            <circle
              cx="50" cy="50" r={r}
              fill="none"
              strokeWidth="10"
              strokeDasharray={`${dash} ${circ}`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              className={ringClass}
              style={ringStyle}
            />
          </svg>
          <p className={`mt-2 text-2xl font-bold ${labelClass}`}>{pct}%</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Score</p>
        </div>

        {/* Raw stats */}
        <div className="surface-card flex flex-col justify-center gap-4 p-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Correct</p>
            <p className="mt-1 text-2xl font-bold">{result.score}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Total</p>
            <p className="mt-1 text-2xl font-bold">{result.totalMarks}</p>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="surface-card divide-y divide-slate-100 dark:divide-slate-800">
        <div className="flex items-center gap-3 px-4 py-3">
          <FiUser aria-hidden="true" size={16} className="text-slate-400" />
          <span className="text-sm font-medium">{result.studentId.username}</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3">
          <FiCalendar aria-hidden="true" size={16} className="text-slate-400" />
          <span className="text-sm">
            {new Date(result.attemptedOn).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3">
          <FiAward aria-hidden="true" size={16} className={labelClass} />
          <span className={`text-sm font-bold ${labelClass}`}>
            {pct >= 80 ? "Excellent" : pct >= 50 ? "Passed" : "Needs improvement"}
          </span>
        </div>
      </div>
    </div>
  );
};
