import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import * as ReactDOM from "react-dom";

interface AddModalProps {
  title: string;
  isOpen?: boolean;
  setIsOpen: (value: boolean) => void;
  child: React.ReactNode;
}

export const Modal: React.FC<AddModalProps> = ({ title, setIsOpen, child }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="fixed left-1/2 top-1/2 z-50 flex max-h-[min(90dvh,44rem)] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-2xl shadow-slate-950/25 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700 sm:px-6">
          <h2 id="modal-title" className="text-lg font-bold tracking-tight">
            {title}
          </h2>
          <button
            title="Close"
            aria-label="Close dialog"
            onClick={() => setIsOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>
        <div className="min-h-0 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          {child}
        </div>
      </div>
    </>,
    document.querySelector(".portalModalDiv") as HTMLDivElement,
  );
};
