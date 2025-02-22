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
            role === "faculty" ? "bg-blue-500" : "bg-green-500"
          } text-sm rounded w-min px-1 ring-2`}
        >
          {role}
        </span>
      )}
      {title && bg && (
        <span className={`${bg} px-1 rounded ring-2`}>{title}</span>
      )}
    </>
  );
};
