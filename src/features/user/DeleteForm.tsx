interface DeleteFormProps {
  deleteHandler: () => void;
  closeModal: () => void;
  name: string;
  isLoading: boolean;
}

export const DeleteForm: React.FC<DeleteFormProps> = ({
  deleteHandler,
  isLoading,
  closeModal,
  name,
}) => {
  return (
    <div className="flex flex-col gap-6 text-center">
      <p className="text-base text-muted-foreground">
        Are you sure you want to delete{" "}
        <span className="text-accent font-semibold">{name}</span>?
      </p>

      <div className="flex justify-end gap-3">
        <button onClick={closeModal} className="btn-outline" type="button">
          Cancel
        </button>
        <button
          onClick={deleteHandler}
          disabled={isLoading}
          className="btn-solid bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
          type="button"
        >
          {isLoading ? "Deleting..." : "Yes, Delete"}
        </button>
      </div>
    </div>
  );
};
