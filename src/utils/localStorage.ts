import { jwtDecode } from "jwt-decode";
import { UserI } from "../features/user/usersApi";

export const setToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const getUser = (): UserI => {
  const token = localStorage.getItem("token")!;
  const decoded = jwtDecode<{ _id: string; username: string; role: string }>(
    token
  );
  const user = {
    _id: decoded?._id,
    username: decoded?.username,
    role: decoded?.role,
  };

  return user;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};
