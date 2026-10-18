import { useEffect, useState } from "react";
import { IQBank, useGetAllQBanksQuery } from "../../features/qbank/qBankApi";
import { QBankItem } from "../../features/qbank/QBankItem";
import { NoResult } from "../NoResult";
import { Modal } from "../Modal";
import { AddQBankForm } from "../../features/qbank/AddQBankForm";
import Loader from "../Loader";
import { FiPlus, FiSearch } from "react-icons/fi";

export const QuestionBanks = () => {
  const { data: qBanks, isLoading, isFetching } = useGetAllQBanksQuery();
  const [filteredQBanks, setFilteredQBanks] = useState<IQBank[] | undefined>();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [term, setTerm] = useState("");

  useEffect(() => {
    setFilteredQBanks(
      qBanks?.filter((qb) => qb.title.toLowerCase().includes(term.toLowerCase()))
    );
  }, [term, qBanks]);

  if (isLoading || isFetching) return <Loader />;
  if (!qBanks?.length) return <NoResult message="No question banks found." />;

  return (
    <>
      <div className="dashboard-page">
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

        {/* Search */}
        <div className="surface-card mb-6 flex items-center gap-3 p-3">
          <FiSearch aria-hidden="true" size={18} className="text-slate-400" />
          <input
            type="search"
            placeholder="Search question banks…"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="!border-0 !bg-transparent !p-1 !ring-0 text-sm"
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
