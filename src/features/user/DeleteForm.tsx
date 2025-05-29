interface DeleteFormProps {
  deleteHandler: () => void;
  closeModal: () => void;
  name: string;
}

export const DeleteForm: React.FC<DeleteFormProps> = ({
  deleteHandler,
  closeModal,
  name,
}) => {
  return (
    <form>
      <div className="flex flex-col gap-4 bg-highlight/40 p-4 rounded-lg shadow-md">
        <div className="text-secondary/80 text-sm md:text-base">
          Are you sure want to delete{" "}
          <span className="text-secondary font-bold">{name}</span> ?
        </div>
        <div className="flex items-center justify-end gap-2 text-sm md:text-base">
          <button
            onClick={closeModal}
            className="bg-highlight p-1 px-2 rounded"
          >
            no
          </button>
          <button
            onClick={deleteHandler}
            className="bg-accent p-1 px-2 rounded"
          >
            yes
          </button>
        </div>
      </div>
    </form>
  );
};
