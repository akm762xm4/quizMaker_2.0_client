import { useEffect, useRef, useState } from "react";
import { IQBank, useGetAllQBanksQuery, useImportQuestionBankMutation } from "../../features/qbank/qBankApi";
import { QBankItem } from "../../features/qbank/QBankItem";
import { NoResult } from "../NoResult";
import { Modal } from "../Modal";
import { AddQBankForm } from "../../features/qbank/AddQBankForm";
import Loader from "../Loader";
import { FiFileText, FiPlus, FiSearch, FiUploadCloud } from "react-icons/fi";
import { toast } from "sonner";
import { ErrorI } from "../../types";

export const QuestionBanks = () => {
  const { data: qBanks, isLoading, isFetching } = useGetAllQBanksQuery();
  const [filteredQBanks, setFilteredQBanks] = useState<IQBank[] | undefined>();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [term, setTerm] = useState("");
  const [importQuestionBank, { isLoading: isImporting }] = useImportQuestionBankMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onImport = async (file?: File) => {
    if (!file) return;
    const allowed = ["application/pdf", "text/plain", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    const extension = file.name.toLowerCase().split(".").pop();
    if (!allowed.includes(file.type) && !["pdf", "docx", "txt"].includes(extension || "")) {
      toast.error("Choose a PDF, DOCX, or TXT file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("The document must be smaller than 5 MB.");
      return;
    }
    try {
      const response = await importQuestionBank(file).unwrap();
      if (response.status === "no_mcqs") toast.info(response.message);
      else toast.success(`Created question bank “${response.questionBank?.title}” with ${response.questionBank?.questions.length} questions.`);
    } catch (error) {
      toast.error((error as ErrorI)?.data?.error || "Could not extract questions from this document.");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    setFilteredQBanks(
      qBanks?.filter((qb) => qb.title.toLowerCase().includes(term.toLowerCase()))
    );
  }, [term, qBanks]);

  if (isLoading || isFetching) return <Loader />;
  if (!qBanks?.length) return <NoResult message="No question banks found." />;

  return (
    <>
      <div className="dashboard-page aurora-page min-h-full pb-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">
              Content library
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Question Banks</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Reusable pools of questions used to build quizzes.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsAddOpen(true)}
            className="btn-dashboard self-start sm:self-auto"
          >
            <FiPlus aria-hidden="true" size={18} />
            Add Question Bank
          </button>
        </div>

        <section className="surface-card relative mb-6 overflow-hidden border-violet-200/70 bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-5 dark:border-violet-900/70 dark:from-violet-950/40 dark:via-slate-900 dark:to-indigo-950/30 sm:p-6">
          <div className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-violet-300/30 blur-3xl dark:bg-violet-500/20" />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent text-white shadow-lg shadow-violet-500/20"><FiUploadCloud size={22} /></span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">AI-assisted import</p>
                <h2 className="mt-1 text-xl font-bold">Turn study material into a question bank</h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">Upload a PDF, Word document, or text file. We’ll detect existing multiple-choice questions and create a draft bank named after the file.</p>
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-stretch gap-2 sm:flex-row sm:items-center">
              <input ref={fileInputRef} type="file" accept=".pdf,.docx,.txt,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="sr-only" onChange={(event) => onImport(event.target.files?.[0])} />
              <button type="button" disabled={isImporting} onClick={() => fileInputRef.current?.click()} className="btn-dashboard justify-center disabled:cursor-wait disabled:opacity-60"><FiFileText size={17} />{isImporting ? "Reading document…" : "Import document"}</button>
              <span className="text-center text-xs text-slate-500 dark:text-slate-400">PDF · DOCX · TXT · 5 MB max</span>
            </div>
          </div>
        </section>

        {/* Search */}
        <div className="surface-card mb-6 flex min-w-0 items-center gap-3 p-3">
          <FiSearch aria-hidden="true" size={18} className="text-slate-400" />
          <input
            type="search"
            placeholder="Search question banks…"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="!min-w-0 !flex-1 !border-0 !bg-transparent !px-0 !py-2 !ring-0 text-sm"
            aria-label="Search question banks"
          />
        </div>

        {/* Grid */}
        {filteredQBanks?.length ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredQBanks.map((qBank) => (
              <QBankItem key={qBank._id} qBank={qBank} />
            ))}
          </div>
        ) : (
          <NoResult message={`No question banks match "${term}".`} />
        )}
      </div>

      {isAddOpen && (
        <Modal
          title="Add Question Bank"
          setIsOpen={setIsAddOpen}
          child={<AddQBankForm closeModal={() => setIsAddOpen(false)} isEdit={false} />}
        />
      )}
    </>
  );
};
