import { useNavigate } from "react-router-dom";
import { getUser, logoutUser } from "../utils/localStorage";
import { CiLogout } from "react-icons/ci";
import { adminNavbar, facultyNavbar, studentNavbar } from "../utils/navbar";

export const Navbar = () => {
  const navigate = useNavigate();
  const loggedUser = getUser();
  const handleLogoutClick = () => {
    logoutUser();
    navigate("/");
  };
  return (
    <div className="flex items-center justify-between bg-primary p-3 border-b border-black">
      <span className="font-bold text-2xl">{loggedUser.username}</span>
      <span className="flex divide-x-2 divide-secondary ">
        {loggedUser.role === "admin" &&
          adminNavbar.map((item) => (
            <button
              onClick={() => navigate(item.path)}
              className={`capitalize hover:text-accent hover:font-bold px-2 transition ${
                location.pathname === item.path && "text-accent"
              }`}
              key={item.path}
            >
              {item.name}
            </button>
          ))}
        {loggedUser.role === "faculty" &&
          facultyNavbar.map((item) => (
            <button
              onClick={() => navigate(item.path)}
              className={`capitalize hover:text-accent hover:font-bold px-2 transition ${
                location.pathname === item.path && "text-accent"
              }`}
              key={item.path}
            >
              {item.name}
            </button>
          ))}
        {loggedUser.role === "student" &&
          studentNavbar.map((item) => (
            <button
              onClick={() => navigate(item.path)}
              className={`capitalize hover:text-accent hover:font-bold px-2 transition ${
                location.pathname === item.path && "text-accent"
              }`}
              key={item.path}
            >
              {item.name}
            </button>
          ))}
      </span>
      <button
        className="hover:bg-accent hover transition rounded p-1"
        onClick={handleLogoutClick}
        title="logout"
      >
        <CiLogout className="stroke-[1.25]" size={24} />
      </button>
    </div>
  );
};
