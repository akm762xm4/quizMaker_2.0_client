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
      correctOption: values.correctOption,
      op1: values.op1,
      op2: values.op2,
      op3: values.op3,
      op4: values.op4,
    };

    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-col gap-3 bg-highlight/40 p-4 rounded-lg shadow-md">
        <span className="flex flex-col ">
          <label htmlFor="text">Question</label>
          <textarea
            className="bg-highlight/50  outline-none rounded p-2 text-xs md:text-sm"
            id="text"
            rows={5}
            {...register("text", { required: true })}
          />
        </span>

        <span className="flex flex-col md:flex-row gap-2">
          <label htmlFor="category">Topic</label>
          <input
            className="bg-highlight/50 px-1 outline-none rounded text-sm md:text-base"
            id="category"
            type="text"
            {...register("category", { required: true })}
          />
        </span>

        {/* Options & Radio Buttons */}
        <div className="flex flex-col  gap-2">
          {["op1", "op2", "op3", "op4"].map((option, index) => (
            <label
              key={option}
              className="flex flex-col text-xs md:text-sm md:flex-row items-start gap-2"
            >
              {`option-${index + 1}`}
              <div className="flex flex-row gap-2">
                <input
                  type="radio"
                  value={index.toString()} // Convert index to string to match correctOption type
                  {...register("correctOption", { required: true })}
                />
                <input
                  type="text"
                  className="bg-highlight/50 px-1 outline-none rounded"
                  {...register(option as keyof AddQuestionI, {
                    required: true,
                  })}
                />
              </div>
            </label>
          ))}
        </div>

        {/* Buttons */}
        <span className="ml-auto flex gap-1 text-sm md:text-base">
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
