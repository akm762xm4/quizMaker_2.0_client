import { IQBank, useDeleteQBankMutation } from "../qbank/qBankApi";
import { Quiz, useDeleteQuizMutation } from "../quiz/quizApi";
import { Result } from "../result/resultApi";
import { useDeleteUserMutation, UserI } from "./usersApi";

interface DeleteUserFormProps {
  user?: UserI;
  quiz?: Quiz;
  qBank?: IQBank;
  result?: Result;
  closeModal: () => void;
}

export const DeleteUserForm: React.FC<DeleteUserFormProps> = ({
  user,
  quiz,
  qBank,
  result,
  closeModal,
}) => {
  const [deleteUser] = useDeleteUserMutation();
  const [deleteQuiz] = useDeleteQuizMutation();
  const [deleteQBank] = useDeleteQBankMutation();
  // const [deleteResult] = useDeleteQBankMutation();

  const handleDelete = async () => {
    if (user) {
      await deleteUser(user?._id)
        .unwrap()
        .then(() => closeModal());
      return;
    }

    if (qBank) {
      await deleteQBank(qBank?._id)
        .unwrap()
        .then(() => closeModal());
      return;
    }

    if (result) {
      closeModal();
      return;
    }

    await deleteQuiz(quiz?._id)
      .unwrap()
      .then(() => closeModal());
  };

  return (
    <form>
      <div className="flex flex-col gap-4 bg-highlight/40 p-4 rounded-lg shadow-md">
        <div className="text-secondary/80">
          Are you sure want to delete{" "}
          <span className="text-secondary font-bold">
            {user && user?.username}
            {quiz && quiz.title}
            {qBank && qBank.title}
            {result && "this result"}
          </span>{" "}
          ?
        </div>
        <div className="flex items-center justify-end gap-2 ">
          <button
            onClick={closeModal}
            className="bg-highlight p-1 px-2 rounded"
          >
            no
          </button>
          <button onClick={handleDelete} className="bg-accent p-1 px-2 rounded">
            yes
          </button>
        </div>
      </div>
    </form>
  );
};
