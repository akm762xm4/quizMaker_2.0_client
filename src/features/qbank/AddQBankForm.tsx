import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ErrorI } from "../../types";
import { useEffect } from "react";
import {
  AddQBankFormI,
  IQBank,
  useCreateQBankMutation,
  useRenameQBankMutation,
} from "./qBankApi";

interface AddQBankFormProps {
  closeModal: () => void;
  isEdit: boolean;
  qBank?: IQBank;
}

export const AddQBankForm: React.FC<AddQBankFormProps> = ({
  closeModal,
  isEdit,
  qBank,
}) => {
  const [renameQBank, { isLoading: isRenaming }] = useRenameQBankMutation();
  const [createQBank, { isLoading: isCreating }] = useCreateQBankMutation();
  const { register, handleSubmit, setValue } = useForm<AddQBankFormI>();

  const onSubmit: SubmitHandler<AddQBankFormI> = async (values) => {
    if (!values.title) {
      toast.error("Field is required!");
      return;
    }
    try {
      if (isEdit && qBank) {
        const res = await renameQBank({
          qBankId: qBank._id,
          body: values,
        }).unwrap();
        toast.success(res.message);
      } else {
        const res = await createQBank(values).unwrap();
        toast.success(res.message);
      }
      closeModal();
    } catch (error) {
      const err = error as ErrorI;
      toast.error(err?.data?.error);
    }
  };

  useEffect(() => {
    if (isEdit && qBank) {
      setValue("title", qBank.title);
    }
  }, [isEdit, qBank, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 bg-highlight/40 p-6 rounded-lg shadow-md">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="form-input"
            {...register("title")}
          />
        </div>
        <div className="ml-auto flex gap-2 text-sm">
          <button className="btn-outline" type="reset">
            Reset
          </button>
          <button
            className="btn-primary disabled:opacity-50"
            type="submit"
            disabled={isRenaming || isCreating}
          >
            {isRenaming || isCreating
              ? "Saving..."
              : isEdit
              ? "Update"
              : "Create"}
          </button>
        </div>
      </div>
    </form>
  );
};
