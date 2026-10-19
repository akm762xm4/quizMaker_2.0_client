import { jwtDecode } from "jwt-decode";
import { UserI } from "../features/user/usersApi";

const TOKEN_KEY = "token";

/**
 * `localStorage` can throw (not just return null) in private/hardened browser
 * modes and when storage is full. An uncaught throw here would blank the whole
 * app, so every access goes through these helpers.
 */
export const readLocalStorage = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const writeLocalStorage = (key: string, value: string): boolean => {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
};

export const removeLocalStorage = (key: string): void => {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Nothing we can do; the session simply won't persist.
  }
};

/** Saves the session token. Returns false when storage is unavailable. */
export const setToken = (token: string): boolean =>
  writeLocalStorage(TOKEN_KEY, token);

export const getToken = (): string | null => readLocalStorage(TOKEN_KEY);

export const getUser = (): UserI | null => {
  const token = getToken();
  if (!token) return null;

  try {
    // The server signs the token with `id`; `_id` is kept for older tokens.
    const decoded = jwtDecode<{
      _id?: string;
      id?: string;
      username: string;
      role: string;
    }>(token);
    return {
      _id: decoded._id ?? decoded.id ?? "",
      username: decoded.username,
      role: decoded.role,
    };
  } catch {
    return null;
  }
};

export const logoutUser = () => {
  removeLocalStorage(TOKEN_KEY);
  window.location.href = "/";
};
