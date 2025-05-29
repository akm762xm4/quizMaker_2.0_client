import { useNavigate } from "react-router-dom";
import { getUser, logoutUser } from "../utils/localStorage";
import { CiLogout } from "react-icons/ci";
import { adminNavbar, facultyNavbar, studentNavbar } from "../utils/navbar";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";

export const Navbar = () => {
  const navigate = useNavigate();
  const loggedUser = getUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoutClick = () => {
    logoutUser();
    navigate("/");
  };

  const navItems =
    loggedUser.role === "admin"
      ? adminNavbar
      : loggedUser.role === "faculty"
      ? facultyNavbar
      : studentNavbar;

  return (
    <div className="bg-primary p-3 border-b border-black">
      <div className="flex items-center justify-between">
        <span className="font-bold text-2xl">{loggedUser.username}</span>

        {/* Desktop Menu */}
        <div className="hidden md:flex divide-x-2 divide-secondary">
          {navItems.map((item) => (
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
        </div>

        <div className="flex items-center gap-2">
          <button
            className="hover:bg-accent hover transition rounded p-1"
            onClick={handleLogoutClick}
            title="logout"
          >
            <CiLogout className="stroke-[1.25]" size={24} />
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden hover:bg-accent hover transition rounded p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            title="menu"
          >
            <IoMenu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 flex flex-col gap-2 items-start border-t border-black py-2">
          {navItems.map((item) => (
            <button
              onClick={() => {
                navigate(item.path);
                setIsMenuOpen(false);
              }}
              className={`capitalize hover:text-accent hover:font-bold px-2 py-1 transition ${
                location.pathname === item.path && "text-accent"
              }`}
              key={item.path}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
