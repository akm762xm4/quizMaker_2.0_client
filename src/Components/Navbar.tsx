import { useNavigate } from "react-router-dom";
import { getUser, logoutUser } from "../utils/localStorage";
import { CiLogout } from "react-icons/ci";
import { adminNavbar, facultyNavbar, studentNavbar } from "../utils/navbar";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Modal } from "./Modal";
import { LogoutForm } from "../features/user/LogoutForm";

export const Navbar = () => {
  const navigate = useNavigate();
  const loggedUser = getUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutClick = () => {
    setIsLoggingOut(true);
    logoutUser();
    navigate("/");
    setIsLoggingOut(false);
  };

  const navItems =
    loggedUser.role === "admin"
      ? adminNavbar
      : loggedUser.role === "faculty"
      ? facultyNavbar
      : studentNavbar;

  if (!loggedUser) return null;
  if (["/", "/register"].includes(location.pathname)) return null;
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="page-container py-4 flex items-center justify-between">
        <span className="text-xl font-semibold text-black">
          {loggedUser.username}
        </span>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-4">
          {navItems.map((item) => (
            <button
              onClick={() => navigate(item.path)}
              key={item.path}
              className={`capitalize px-3 py-1 rounded-lg transition hover:text-accent hover:bg-gray-100 ${
                location.pathname === item.path
                  ? "text-accent font-semibold"
                  : "text-gray-700"
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            className="hover:bg-gray-100 transition rounded-full p-2"
            onClick={() => setIsLogoutOpen(true)}
            title="Logout"
          >
            <CiLogout className="stroke-[1.25]" size={22} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden hover:bg-gray-100 transition rounded-full p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            title="Menu"
          >
            <IoMenu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 py-2 px-4">
          {navItems.map((item) => (
            <button
              onClick={() => {
                navigate(item.path);
                setIsMenuOpen(false);
              }}
              key={item.path}
              className={`block w-full text-left capitalize px-2 py-2 rounded-lg transition hover:text-accent hover:bg-gray-100 ${
                location.pathname === item.path
                  ? "text-accent font-semibold"
                  : "text-gray-800"
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>
      )}
      {isLogoutOpen && (
        <Modal
          title="Logout"
          setIsOpen={setIsLogoutOpen}
          child={
            <LogoutForm
              logoutHandler={handleLogoutClick}
              closeModal={() => setIsLogoutOpen(false)}
              isLoading={isLoggingOut}
            />
          }
        />
      )}
    </header>
  );
};
