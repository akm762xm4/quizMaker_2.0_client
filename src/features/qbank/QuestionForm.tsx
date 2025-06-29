import { SubmitHandler, useForm } from "react-hook-form";
import { AddQuestionI, QuestionI } from "./qBankApi";

interface QuestionFormProps {
  question?: QuestionI;
  onSubmit: (data: AddQuestionI) => void;
  isLoading: boolean;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  onSubmit,
  isLoading,
}) => {
  const { register, handleSubmit } = useForm<AddQuestionI>({
    defaultValues: question
      ? {
          text: question.text,
          category: question.category,
          correctOption: question.correctOption.toString(),
          op1: question.options[0],
          op2: question.options[1],
          op3: question.options[2],
          op4: question.options[3],
        }
      : {},
  });

  const handleFormSubmit: SubmitHandler<AddQuestionI> = (values) => {
    const options = [values.op1, values.op2, values.op3, values.op4];

    onSubmit({
      text: values.text,
      category: values.category,
      correctOption: Number(values.correctOption),
      op1: values.op1,
      op2: values.op2,
      op3: values.op3,
      op4: values.op4,
      options,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-col gap-4 bg-muted p-3 rounded-md shadow border border-secondary text-text-primary text-sm max-h-[80vh] overflow-y-auto">
        {/* Question Text */}
        <div className="form-group">
          <label htmlFor="text" className="form-label text-xs">
            Question
          </label>
          <textarea
            id="text"
            rows={3}
            className="form-input text-sm p-2 resize-none"
            {...register("text", { required: true })}
          />
        </div>

        {/* Topic / Category */}
        <div className="form-group">
          <label htmlFor="category" className="form-label text-xs">
            Topic
          </label>
          <input
            id="category"
            type="text"
            className="form-input text-sm p-2"
            {...register("category", { required: true })}
          />
        </div>

        {/* Options */}
        <div className="form-group gap-2">
          <label className="form-label text-xs">Options</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((num, i) => (
              <div
                key={i}
                className="flex items-center gap-2 border border-gray-300 bg-primary p-1.5 rounded"
              >
                <input
                  type="radio"
                  value={i.toString()}
                  {...register("correctOption", { required: true })}
                />
                <input
                  type="text"
                  placeholder={`Option ${num}`}
                  className="form-input p-1 text-xs"
                  {...register(`op${num}` as keyof AddQuestionI, {
                    required: true,
                  })}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-2 text-sm">
          <button type="reset" className="btn-outline px-3 py-1 text-xs">
            Reset
          </button>
          <button
            type="submit"
            className="btn-primary px-3 py-1 text-xs disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : question ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
};
