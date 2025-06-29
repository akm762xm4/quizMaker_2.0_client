interface LogoutFormProps {
  logoutHandler: () => void;
  closeModal: () => void;
  username?: string;
  isLoading: boolean;
}

export const LogoutForm: React.FC<LogoutFormProps> = ({
  logoutHandler,
  closeModal,
  username,
  isLoading,
}) => {
  return (
    <div className="flex flex-col gap-6 text-center">
      <p className="text-base text-muted-foreground">
        Are you sure you want to log out
        {username && (
          <>
            {" "}
            from <span className="text-accent font-semibold">{username}</span>
          </>
        )}
        ?
      </p>

      <div className="flex justify-end gap-3">
        <button onClick={closeModal} className="btn-outline">
          Cancel
        </button>
        <button
          onClick={logoutHandler}
          className="btn-solid bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Logging out..." : "Yes, Logout"}
        </button>
      </div>
    </div>
  );
};
