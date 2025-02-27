import { useEffect, useState } from "react";
import {
  IQBank,
  useGetAllQuestionBanksQuery,
} from "../../features/qbank/qBankApi";
import { QBankItem } from "../../features/qbank/QBankItem";
import { TbFilterSearch } from "react-icons/tb";
import { NoResult } from "../NoResult";

export const QuestionBanks = () => {
  const { data: qBanks } = useGetAllQuestionBanksQuery();
  const [filteredQBanks, setFilteredQBanks] = useState<IQBank[] | undefined>();
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
    <div className="flex flex-col h-screen">
      <div className="p-4 flex  gap-3 bg-primary/20">
        <TbFilterSearch size={24} />
        <input
          type="text"
          placeholder="Search by questionbank title"
          value={term}
          onChange={(e) => setTerm(() => e.target.value)}
          className="bg-primary outline-none rounded px-1 placeholder:text-xs"
        />
      </div>
      <div className="flex flex-col gap-2 p-2 px-[20%]">
        {filteredQBanks?.map((qBank) => (
          <QBankItem key={qBank._id} qBank={qBank} />
        ))}
      </div>
    </div>
  );
};
