import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiBarChart2,
  FiBookOpen,
  FiCheck,
  FiFileText,
  FiLayers,
  FiShield,
  FiUsers,
} from "react-icons/fi";

const roles = [
  { icon: FiShield, label: "Administrators", text: "Manage users, review content, approve access, and understand the whole assessment workspace." },
  { icon: FiLayers, label: "Faculty", text: "Build question banks, import MCQs from documents, publish quizzes, and review learner outcomes." },
  { icon: FiBookOpen, label: "Students", text: "Discover available quizzes, complete timed attempts, and track results over time." },
];

const capabilities = [
  [FiFileText, "AI-assisted document import", "Turn PDF, DOCX, or TXT study material into a question bank in moments."],
  [FiBarChart2, "Role-aware dashboards", "Every role gets a focused view of the work that matters to them."],
  [FiUsers, "Protected collaboration", "Server-enforced permissions keep administration, authoring, and attempts separate."],
];

export const Showcase = () => (
  <main className="aurora-page min-h-screen overflow-hidden bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50">
    <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8 lg:px-12">
      <header className="flex items-center justify-between border-b border-slate-200/80 pb-5 dark:border-slate-800">
        <Link to="/" className="flex items-center gap-3 no-underline">
          <img src="/quizmaker_logo_mark.svg" alt="QuizMaker" className="h-9 w-9" />
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">QuizMaker 2.0</span>
        </Link>
        <Link to="/" className="btn-dashboard">Try the demo <FiArrowRight /></Link>
      </header>

      <section className="relative grid gap-12 py-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:py-24">
        <div className="relative z-10">
          <p className="section-rule mb-6 max-w-md">Assessment, with a clearer next step</p>
          <h1 className="max-w-4xl text-5xl font-bold leading-[.98] tracking-[-.06em] sm:text-7xl">A smarter way to create, deliver, and understand quizzes.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">QuizMaker 2.0 is a role-based assessment workspace that brings administrators, faculty, and students into one calm, purposeful flow.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link to="/" className="btn-dashboard min-h-12 px-5">Explore the live demo <FiArrowRight /></Link><a href="#how-it-works" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-700 no-underline transition hover:border-violet-300 hover:text-accent dark:border-slate-700 dark:text-slate-200">See how it works</a></div>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-400"><span className="flex items-center gap-2"><FiCheck className="text-emerald-500" /> Sample-safe demo data</span><span className="flex items-center gap-2"><FiCheck className="text-emerald-500" /> Responsive by design</span><span className="flex items-center gap-2"><FiCheck className="text-emerald-500" /> Light, dark, and system themes</span></div>
        </div>
        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-8 rounded-[3rem] bg-violet-500/10 blur-3xl" />
          <div className="aurora-panel relative rounded-[2rem] p-4 shadow-2xl shadow-violet-200/50 dark:shadow-violet-950/30 sm:p-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-violet-600">Faculty workspace</p><h2 className="mt-1 text-xl font-bold">Good morning, demo-faculty</h2></div><span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-100 text-accent dark:bg-violet-950"><FiLayers /></span></div>
            <div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-violet-50 p-4 dark:bg-violet-950/40"><p className="text-xs text-slate-500 dark:text-slate-400">Published quizzes</p><p className="mt-2 text-3xl font-bold">12</p><div className="mt-3 h-1.5 rounded-full bg-violet-200 dark:bg-violet-900"><div className="h-full w-3/4 rounded-full bg-accent" /></div></div><div className="rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30"><p className="text-xs text-slate-500 dark:text-slate-400">Responses</p><p className="mt-2 text-3xl font-bold">248</p><p className="mt-3 text-xs font-bold text-emerald-700 dark:text-emerald-300">+18% this week</p></div></div>
            <div className="mt-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-700"><div className="flex items-center justify-between"><p className="font-bold">Question bank activity</p><span className="text-xs text-slate-400">This week</span></div><div className="mt-5 flex h-28 items-end gap-2">{[35,55,42,76,58,88,68].map((height, i) => <div key={i} className="flex flex-1 flex-col items-center gap-2"><div className="w-full rounded-t-lg bg-accent/80" style={{ height: `${height}%` }} /><span className="text-[10px] text-slate-400">{["M","T","W","T","F","S","S"][i]}</span></div>)}</div></div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-t border-slate-200 py-16 dark:border-slate-800 lg:py-20"><div className="max-w-2xl"><p className="section-rule mb-5 max-w-xs">One workspace, three perspectives</p><h2 className="text-3xl font-bold tracking-tight sm:text-5xl">Designed around the people doing the work.</h2><p className="mt-4 text-slate-600 dark:text-slate-300">The experience changes with the role, while the product stays consistent, approachable, and easy to explore.</p></div><div className="mt-10 grid gap-4 md:grid-cols-3">{roles.map(({ icon: Icon, label, text }, index) => <article key={label} className="surface-card group p-6 transition hover:-translate-y-1 hover:border-violet-300"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-violet-100 text-accent dark:bg-violet-950"><Icon size={21} /></span><span className="text-xs font-bold text-slate-400">0{index + 1}</span></div><h3 className="mt-7 text-xl font-bold">{label}</h3><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p></article>)}</div></section>

      <section className="grid gap-4 pb-16 md:grid-cols-3 lg:pb-24">{capabilities.map(([Icon, title, text]) => <article key={title as string} className="rounded-[1.5rem] border border-slate-200 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-900/60"><Icon className="text-accent" size={22} /><h3 className="mt-5 font-bold">{title as string}</h3><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{text as string}</p></article>)}</section>

      <section className="relative overflow-hidden rounded-[2rem] bg-accent p-8 text-white shadow-2xl shadow-violet-500/20 sm:p-12"><div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/15 blur-3xl" /><div className="relative flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-bold uppercase tracking-[.16em] text-violet-100">Take the product for a spin</p><h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">See every side of the assessment workflow.</h2><p className="mt-3 max-w-xl text-violet-100">Use the built-in demo accounts to explore administrator, faculty, and student journeys with safe sample data.</p></div><Link to="/" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-violet-700 no-underline transition hover:bg-violet-50">Open the demo <FiArrowRight /></Link></div></section>
      <footer className="flex flex-col gap-3 py-8 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between"><span>QuizMaker 2.0 · A role-based assessment experience</span><Link to="/" className="no-underline">Back to sign in <FiArrowRight className="inline" /></Link></footer>
    </div>
  </main>
);
