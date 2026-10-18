import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const BackButton = ({ label = "Back" }: { label?: string }) => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-slate-600 transition hover:bg-violet-50 hover:text-violet-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:text-slate-300 dark:hover:bg-violet-950/40 dark:hover:text-white"
    >
      <IoArrowBack aria-hidden="true" size={18} />
      {label}
    </button>
  );
};
