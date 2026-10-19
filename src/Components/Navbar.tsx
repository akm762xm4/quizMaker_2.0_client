import { useLocation, useNavigate } from "react-router-dom";
import { getToken, getUser, logoutUser } from "../utils/localStorage";
import { adminNavbar, facultyNavbar, studentNavbar } from "../utils/navbar";
import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { LogoutForm } from "../features/user/LogoutForm";
import { useTheme } from "./useTheme";
import { FiBarChart2, FiBookOpen, FiClipboard, FiFileText, FiHome, FiLogOut, FiMenu, FiMoon, FiSettings, FiSun, FiUsers, FiX } from "react-icons/fi";
import { HiOutlineDesktopComputer } from "react-icons/hi";

const iconFor = (name: string) => {
  const icons: Record<string, React.ElementType> = { dashboard: FiHome, users: FiUsers, quizzes: FiClipboard, "question-banks": FiBookOpen, results: FiBarChart2, requests: FiFileText };
  return icons[name] || FiSettings;
};

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loggedUser = getToken() ? getUser() : null;
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  useEffect(() => { document.body.style.overflow = isMenuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [isMenuOpen]);
  if (!loggedUser) return null;
  const navItems = loggedUser.role === "admin" ? adminNavbar : loggedUser.role === "faculty" ? facultyNavbar : studentNavbar;
  const links = <nav aria-label="Main navigation" className="space-y-1">{navItems.map((item) => { const Icon = iconFor(item.name); return <button type="button" key={item.path} onClick={() => { navigate(item.path); setIsMenuOpen(false); }} className={`sidebar-link ${location.pathname === item.path ? "sidebar-link-active" : ""}`}><Icon aria-hidden="true" size={19} /><span>{item.name.replace("-", " ")}</span></button>; })}</nav>;
  const themes: { value: "light" | "dark" | "system"; label: string; icon: React.ElementType }[] = [{ value: "light", label: "Light", icon: FiSun }, { value: "dark", label: "Dark", icon: FiMoon }, { value: "system", label: "System", icon: HiOutlineDesktopComputer }];
  const tools = <><div className="mt-auto border-t border-slate-200 pt-4 dark:border-slate-800"><p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Appearance</p><div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">{themes.map(({ value, label, icon: Icon }) => <button key={value} type="button" aria-label={`${label} theme`} aria-pressed={theme === value} onClick={() => setTheme(value)} className={`grid min-h-10 place-items-center rounded-lg transition ${theme === value ? "bg-white text-violet-700 shadow-sm dark:bg-slate-700 dark:text-violet-300" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}><Icon aria-hidden="true" size={17} /></button>)}</div></div><button type="button" onClick={() => setIsLogoutOpen(true)} className="sidebar-link mt-3 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-300 dark:hover:bg-red-950"><FiLogOut aria-hidden="true" size={19} /><span>Log out</span></button></>;
  return <>
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-200 bg-white p-4 lg:flex dark:border-slate-800 dark:bg-slate-950"><button type="button" onClick={() => navigate(`/${loggedUser.role}`)} className="mb-8 flex items-center gap-3 px-3 text-left"><img src="/quizmaker_logo_mark.svg" alt="QuizMaker logo" className="h-10 w-10 shrink-0" /><span><span className="block text-lg font-bold tracking-tight">QuizMaker</span><span className="block text-xs font-medium text-slate-500 capitalize dark:text-slate-400">{loggedUser.role} workspace</span></span></button>{loggedUser.username.startsWith("demo-") && <p className="mb-4 rounded-xl bg-violet-50 px-3 py-2 text-xs font-medium text-violet-800 dark:bg-violet-950 dark:text-violet-200">Demo workspace. Sample data can be reset.</p>}{links}{tools}</aside>
    <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:hidden dark:border-slate-800 dark:bg-slate-950/90"><button type="button" aria-label="Open navigation" onClick={() => setIsMenuOpen(true)} className="icon-button"><FiMenu aria-hidden="true" size={21} /></button><button type="button" onClick={() => navigate(`/${loggedUser.role}`)} className="flex items-center gap-2 font-bold tracking-tight"><img src="/quizmaker_logo_mark.svg" alt="QuizMaker logo" className="h-7 w-7" />QuizMaker</button><span className="h-11 w-11" aria-hidden="true" /></header>
    {isMenuOpen && <div className="fixed inset-0 z-50 overscroll-none lg:hidden"><button aria-label="Close navigation" className="absolute inset-0 bg-slate-950/50" onClick={() => setIsMenuOpen(false)} /><aside className="relative flex h-[100dvh] w-[min(20rem,88vw)] shrink-0 flex-col overflow-y-auto overscroll-contain bg-white p-4 shadow-2xl dark:bg-slate-950"><div className="mb-8 flex items-center justify-between"><button type="button" onClick={() => { navigate(`/${loggedUser.role}`); setIsMenuOpen(false); }} className="flex items-center gap-3 px-2 text-left"><img src="/quizmaker_logo_mark.svg" alt="QuizMaker logo" className="h-9 w-9" /><span><span className="block text-lg font-bold">QuizMaker</span><span className="block text-xs capitalize text-slate-500 dark:text-slate-400">{loggedUser.role} workspace</span></span></button><button type="button" aria-label="Close navigation" onClick={() => setIsMenuOpen(false)} className="icon-button"><FiX aria-hidden="true" size={20} /></button></div>{links}{tools}</aside></div>}
    {isLogoutOpen && <Modal title="Log out" setIsOpen={setIsLogoutOpen} child={<LogoutForm logoutHandler={() => { logoutUser(); navigate("/"); }} closeModal={() => setIsLogoutOpen(false)} isLoading={false} />} />}
  </>;
};
