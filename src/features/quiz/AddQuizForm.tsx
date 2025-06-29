import { SubmitHandler, useForm } from "react-hook-form";
import {
  AddQuizFormI,
  Quiz,
  useCreateQuizMutation,
  useUpdateQuizMutation,
} from "./quizApi";
import { toast } from "sonner";
import { ErrorI } from "../../types";
import { useEffect } from "react";

interface AddQuizFormProps {
  closeModal: () => void;
  isEdit: boolean;
  quiz?: Quiz;
}

export const AddQuizForm: React.FC<AddQuizFormProps> = ({
  closeModal,
  isEdit,
  quiz,
}) => {
  const [createQuiz, { isLoading: isCreating }] = useCreateQuizMutation();
  const [updateQuiz, { isLoading: isUpdating }] = useUpdateQuizMutation();
  const { register, handleSubmit, setValue } = useForm<AddQuizFormI>();
  const onSubmit: SubmitHandler<AddQuizFormI> = async (values) => {
    if (!values.maxTime || !values.title) {
      toast.error("both fields are required!");
    }
    try {
      if (isEdit) {
        await updateQuiz({ quizId: quiz?._id, patch: values })
          .unwrap()
          .then((res) => {
            toast.success(res?.message);
            closeModal();
          });
      } else {
        await createQuiz(values)
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
    if (isEdit === true && quiz) {
      setValue("title", quiz?.title);
      setValue("maxTime", quiz?.maxTime);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 bg-highlight/40 p-6 rounded-lg shadow-modal w-full max-w-md ">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Quiz Title
          </label>
          <input
            id="title"
            type="text"
            className="form-input"
            placeholder="Enter quiz title"
            {...register("title")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxTime" className="form-label">
            Max Time (in seconds)
          </label>
          <input
            id="maxTime"
            type="number"
            className="form-input"
            placeholder="e.g. 120"
            {...register("maxTime")}
          />
        </div>

        <div className="flex justify-end gap-2 text-sm">
          <button title="Reset" type="reset" className="btn-outline">
            Reset
          </button>
          <button
            type="submit"
            className="btn-primary disabled:opacity-50"
            disabled={isCreating || isUpdating}
          >
            {isCreating || isUpdating
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
