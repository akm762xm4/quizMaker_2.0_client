import { useEffect, useState } from "react";
import { IQBank, useGetAllQBanksQuery } from "../../features/qbank/qBankApi";
import { QBankItem } from "../../features/qbank/QBankItem";
import { TbFilterSearch } from "react-icons/tb";
import { NoResult } from "../NoResult";
import { FaPlus } from "react-icons/fa";
import { Modal } from "../Modal";
import { AddQBankForm } from "../../features/qbank/AddQBankForm";

export const QuestionBanks = () => {
  const { data: qBanks } = useGetAllQBanksQuery();
  const [filteredQBanks, setFilteredQBanks] = useState<IQBank[] | undefined>();
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [term, setTerm] = useState("");

  useEffect(() => {
    let filtered = qBanks;

    filtered = filtered?.filter((qBank) =>
      qBank.title.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredQBanks(filtered);
  }, [term, qBanks]);

  if (!qBanks?.length) {
    return <NoResult />;
  }
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="p-4 flex items-center gap-3 bg-primary/20 ">
          <TbFilterSearch size={24} />
          <input
            type="text"
            placeholder="Search by questionbank title"
            value={term}
            onChange={(e) => setTerm(() => e.target.value)}
            className="bg-primary outline-none rounded p-1 md:px-1 placeholder:text-xs w-full md:w-auto"
          />
        </div>
        <div className="flex flex-col gap-3 p-4 md:px-[10%]">
          {filteredQBanks?.map((qBank) => (
            <QBankItem key={qBank._id} qBank={qBank} />
          ))}
          <button
            title="add quiz"
            className="bg-primary p-2 rounded flex flex-row items-center justify-center "
            onClick={() => setIsAddOpen(true)}
          >
            <FaPlus size={24} />
          </button>
        </div>
      </div>
      {isAddOpen && (
        <Modal
          title="Add QuestionBank"
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
