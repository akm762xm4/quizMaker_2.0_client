import { jwtDecode } from "jwt-decode";
import { UserI } from "../features/user/usersApi";

export const setToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const getUser = (): UserI | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<{ _id: string; username: string; role: string }>(
      token
    );
    return { _id: decoded._id, username: decoded.username, role: decoded.role };
  } catch {
    return null;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};
