import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "./usersApi";
import { GoDotFill } from "react-icons/go";
import { UserSkeleton } from "../../Components/Loaders/UserSkeleton";

export const UserDetail = () => {
  const { userId } = useParams();
  const { data: user, isLoading, isFetching } = useGetUserByIdQuery(userId);

  if (isLoading || isFetching || !user) {
    return <UserSkeleton />;
  }

  return (
    <div className="flex flex-row p-2">
      <div className="flex flex-col basis-1/2 bg-highlight p-2 rounded">
        <span className="flex items-center justify-between">
          <span className="text-3xl font-bold">{user?.username}</span>
          <span className="flex text-sm items-center">
            <GoDotFill fill={user?.isActive ? "green" : "red"} size={24} />
            {user?.isActive ? "active" : "inactive"}
          </span>
        </span>
        <span>{user?.role}</span>
        <span className="text-xs text-secondary/80">
          Created At: {user?.createdAt}
        </span>
      </div>
      <div className="basis-1/2 p-2">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt, quod
        esse perferendis exercitationem sapiente accusamus soluta sint?
      </div>
    </div>
  );
};
