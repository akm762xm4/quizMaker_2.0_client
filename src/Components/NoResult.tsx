import { MdSearchOff } from "react-icons/md";

interface NoResultProps {
  message: string;
}

export const NoResult: React.FC<NoResultProps> = ({
  message = "No Results Found",
}) => {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center text-center text-text-secondary px-4">
      <MdSearchOff size={48} className="text-accent mb-3" />
      <h2 className="text-xl font-semibold">{message}</h2>
      <p className="text-sm mt-1">We couldn’t find any matching records.</p>
    </div>
  );
};
