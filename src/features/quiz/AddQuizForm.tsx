import { SubmitHandler, useForm } from "react-hook-form";
import {
  AddQuizFormI,
  Quiz,
  useCreateQuizMutation,
  useUpdateQuizMutation,
} from "./quizApi";
import { toast } from "react-toastify";
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
  const [createQuiz] = useCreateQuizMutation();
  const [updateQuiz] = useUpdateQuizMutation();
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
        <span className="flex gap-2 flex-col md:flex-row text-sm md:text-base">
          <label htmlFor="maxTime">Max-Time(sec)</label>
          <input
            className="bg-highlight/50 p-1 outline-none rounded md:ml-auto"
            id="maxTime"
            type="number"
            {...register("maxTime")}
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
