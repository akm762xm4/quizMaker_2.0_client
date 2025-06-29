import { useEffect, useState } from "react";
import { IQBank, useGetAllQBanksQuery } from "../../features/qbank/qBankApi";
import { QBankItem } from "../../features/qbank/QBankItem";
import { TbFilterSearch } from "react-icons/tb";
import { NoResult } from "../NoResult";
import { FaPlus } from "react-icons/fa";
import { Modal } from "../Modal";
import { AddQBankForm } from "../../features/qbank/AddQBankForm";
import { PageHeader } from "../PageHeader";
import Loader from "../Loader";

export const QuestionBanks = () => {
  const { data: qBanks, isLoading, isFetching } = useGetAllQBanksQuery();
  const [filteredQBanks, setFilteredQBanks] = useState<IQBank[] | undefined>();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [term, setTerm] = useState("");

  useEffect(() => {
    let filtered = qBanks;
    filtered = filtered?.filter((qBank) =>
      qBank.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredQBanks(filtered);
  }, [term, qBanks]);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (!isLoading && !isFetching && !qBanks?.length) {
    return <NoResult message="No question banks found." />;
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Filter + Add */}
        <PageHeader
          title="Question Banks"
          description="Organize and manage reusable question banks. Create new or edit existing banks."
        />

        <div className="p-4 flex flex-col md:flex-row gap-3 md:items-center justify-between bg-primary/20 rounded mb-4">
          <div className="flex items-center gap-2 w-full md:max-w-md">
            <TbFilterSearch size={20} className="text-text-secondary" />
            <input
              type="text"
              placeholder="Search question bank..."
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="form-input placeholder:text-sm text-sm"
            />
          </div>
          <button
            className="btn-primary flex items-center gap-2"
            onClick={() => setIsAddOpen(true)}
          >
            <FaPlus size={14} /> Add Question Bank
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-[10%]">
          {filteredQBanks?.map((qBank) => (
            <QBankItem key={qBank._id} qBank={qBank} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {isAddOpen && (
        <Modal
          title="Add Question Bank"
          setIsOpen={setIsAddOpen}
          isOpen={isAddOpen}
          child={
            <AddQBankForm
              closeModal={() => setIsAddOpen(false)}
              isEdit={false}
            />
          }
        />
      )}
    </>
  );
};
