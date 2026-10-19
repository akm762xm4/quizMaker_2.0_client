import { API_BASE_URL } from "../app/serverApi";

type ApiErrorLike = {
  status?: number | string;
  data?: unknown;
  error?: string;
};

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

/** Pull `data.error` / `data.message` out of an RTK Query error payload. */
const messageFromData = (data: unknown): string | null => {
  if (!isObject(data)) return null;
  for (const key of ["error", "message"]) {
    const value = data[key];
    if (typeof value === "string" && value.trim()) return value;
  }
  return null;
};

/**
 * Turn an RTK Query error into something worth showing a user.
 *
 * The previous code read `err.data.error` directly, so a *network* failure
 * (no `data` at all) threw a TypeError inside the catch block and the user saw
 * nothing happen at all. That is exactly what a phone experienced when the
 * deployed app tried to reach `localhost:8000`.
 */
export const getApiErrorMessage = (
  error: unknown,
  fallback = "Something went wrong. Please try again."
): string => {
  if (!isObject(error)) return fallback;

  const { status, data } = error as ApiErrorLike;
  const serverMessage = messageFromData(data);
  if (serverMessage) return serverMessage;

  switch (status) {
    case "FETCH_ERROR":
      return import.meta.env.DEV
        ? `Can't reach the API at ${API_BASE_URL}. Is the server running?`
        : "Can't reach the server. Check your internet connection and try again.";
    case "TIMEOUT_ERROR":
      return "The server took too long to respond. Please try again.";
    case "PARSING_ERROR":
      return "The server sent an unexpected response. Please try again.";
    case 401:
      return "Invalid username or password.";
    case 403:
      return "You don't have permission to do that.";
  }

  if (typeof status === "number" && status >= 500) {
    return "The server ran into a problem. Please try again in a moment.";
  }

  return fallback;
};
