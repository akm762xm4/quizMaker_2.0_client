import { SubmitHandler, useForm } from "react-hook-form";
import { AddQuestionI, QuestionI } from "./qBankApi";

interface QuestionFormProps {
  question?: QuestionI; // Optional, used for editing
  onSubmit: (data: AddQuestionI) => void; // Callback function for submission
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  onSubmit,
}) => {
  const { register, handleSubmit } = useForm<AddQuestionI>({
    defaultValues: question
      ? {
          text: question.text,
          category: question.category,
          correctOption: question.correctOption.toString(), // Convert number to string for radio buttons
          op1: question.options[0],
          op2: question.options[1],
          op3: question.options[2],
          op4: question.options[3],
        }
      : {},
  });

  const handleFormSubmit: SubmitHandler<AddQuestionI> = (values) => {
    const formattedData = {
      text: values.text,
      category: values.category,
      correctOption: Number(values.correctOption), // Ensure it's a number
      options: [values.op1, values.op2, values.op3, values.op4],
    };

    onSubmit(formattedData); // Call the provided callback function
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-col gap-3 bg-highlight/40 p-4 rounded-lg shadow-md">
        <span className="flex flex-col ">
          <label htmlFor="text">Question</label>
          <input
            className="bg-highlight/50  outline-none rounded p-2 "
            id="text"
            type="text"
            {...register("text", { required: true })}
          />
        </span>

        <span className="flex gap-2">
          <label htmlFor="category">Topic</label>
          <input
            className="bg-highlight/50 px-1 outline-none rounded ml-auto"
            id="category"
            type="text"
            {...register("category", { required: true })}
          />
        </span>

        {/* Options & Radio Buttons */}
        <div className="flex flex-col gap-2">
          {["op1", "op2", "op3", "op4"].map((option, index) => (
            <label key={option} className="flex items-center gap-2">
              {`option-${index + 1}`}
              <input
                type="radio"
                value={index.toString()} // Convert index to string to match correctOption type
                {...register("correctOption", { required: true })}
              />
              <input
                type="text"
                className="bg-highlight/50 px-1 outline-none rounded"
                {...register(option as keyof AddQuestionI, { required: true })}
              />
            </label>
          ))}
        </div>

        {/* Buttons */}
        <span className="ml-auto flex gap-1">
          <button className="bg-highlight p-1 rounded" type="reset">
            Reset
          </button>
          <button className="bg-accent p-1 rounded" type="submit">
            {question ? "Update" : "Submit"}
          </button>
        </span>
      </div>
    </form>
  );
};
