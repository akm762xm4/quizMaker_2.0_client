interface BadgeProps {
  role?: string;
  title?: string;
  bg?: string;
}
export const Badge: React.FC<BadgeProps> = ({ role, title, bg }) => {
  return (
    <>
      {role && (
        <span
          className={`${
            role === "faculty"
              ? "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300"
              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
          } text-xs font-semibold rounded-full px-2.5 py-0.5`}
        >
          {role}
        </span>
      )}
      {title && bg && (
        <span className={`${bg} px-1 rounded ring-2 text-sm md:text-base`}>
          {title}
        </span>
      )}
    </>
  );
};
