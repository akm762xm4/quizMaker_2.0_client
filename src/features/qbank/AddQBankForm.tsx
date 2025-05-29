import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
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
  const [renameQBank] = useRenameQBankMutation();
  const [createQBank] = useCreateQBankMutation();
  const { register, handleSubmit, setValue } = useForm<AddQBankFormI>();
  const onSubmit: SubmitHandler<AddQBankFormI> = async (values) => {
    if (!values.title) {
      toast.error("field is required!");
    }
    try {
      if (isEdit) {
        await renameQBank({ qBankId: qBank?._id, body: values })
          .unwrap()
          .then((res) => {
            toast.success(res?.message);
            closeModal();
          });
      } else {
        await createQBank(values)
          .unwrap()
          .then((res) => {
            toast.success(res?.message);
            closeModal();
          });
      }
    } catch (error) {
      const err = error as ErrorI;
      toast.error(err?.data?.error);
    }
  };

  useEffect(() => {
    if (isEdit === true && qBank) {
      setValue("title", qBank?.title);
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 bg-highlight/40 p-4 rounded-lg shadow-md">
        <span className="flex gap-2 flex-col md:flex-row text-sm md:text-base">
          <label htmlFor="title">Title</label>
          <input
            className="bg-highlight/50 p-1 outline-none rounded md:ml-auto"
            id="title"
            type="text"
            {...register("title")}
          />
        </span>
        <span className="ml-auto flex gap-1 text-sm md:text-base">
          <button className="bg-highlight p-1 rounded" type="reset">
            Reset
          </button>
          <button className="bg-accent p-1 rounded" type="submit">
            Submit
          </button>
        </span>
      </div>
    </form>
  );
};
