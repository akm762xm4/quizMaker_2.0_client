import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryMeta,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import { getToken, logoutUser } from "../utils/localStorage";

// The API used by deployed builds.
const PRODUCTION_API_URL = "https://quiz-maker-2-0-server.vercel.app/api";
// The API used by `npm run dev` on a developer machine.
const LOCAL_API_URL = "http://localhost:8000/api";

const normalizeUrl = (url: string): string => url.trim().replace(/\/+$/, "");

const isLoopbackUrl = (url: string): boolean => {
  try {
    const { hostname } = new URL(url);
    return (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "0.0.0.0" ||
      hostname === "[::1]" ||
      hostname === "::1"
    );
  } catch {
    return false;
  }
};

/**
 * Resolve the API base URL for this build.
 *
 * A committed `.env` used to set `VITE_API_BASE_URL=http://localhost:8000/api`,
 * which Vite inlined into every production bundle. The deployed site therefore
 * called the visitor's own device: it worked on the developer's laptop (where
 * the API happens to run) but failed on phones, where `localhost` is the phone.
 *
 * A loopback URL is never valid for a deployed build, so it is rejected even if
 * it arrives through an environment variable.
 */
const resolveBaseUrl = (): string => {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  const fallback = import.meta.env.DEV ? LOCAL_API_URL : PRODUCTION_API_URL;
  const baseUrl = normalizeUrl(configured || fallback);

  if (!import.meta.env.DEV && isLoopbackUrl(baseUrl)) {
    console.warn(
      `[QuizMaker] Ignoring "${baseUrl}" as the API URL in a production build ` +
        `because it points at the visitor's own device. Using ${PRODUCTION_API_URL} instead. ` +
        `Set VITE_API_BASE_URL in your hosting provider's environment variables.`
    );
    return PRODUCTION_API_URL;
  }

  if (
    typeof window !== "undefined" &&
    window.location.protocol === "https:" &&
    baseUrl.startsWith("http://") &&
    !isLoopbackUrl(baseUrl)
  ) {
    console.warn(
      `[QuizMaker] The API URL "${baseUrl}" uses plain HTTP while this page is ` +
        `served over HTTPS. Browsers block those requests as mixed content.`
    );
  }

  return baseUrl;
};

export const API_BASE_URL = resolveBaseUrl();

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  // Without a timeout an unreachable API leaves the form stuck on "Logging in...".
  timeout: 20000,
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  unknown,
  object,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  const results = await baseQuery(args, api, extraOptions);
  const url = typeof args === "string" ? args : args.url;

  // A rejected login/registration is a 401 too, but it must not wipe the
  // session and hard-reload the page — that swallowed the error message.
  const isAuthRequest = url.startsWith("/auth/");

  if (results.error?.status === 401 && !isAuthRequest) {
    logoutUser();
  }
  return results;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
  tagTypes: ["user", "quiz", "qBank", "result", "question", "request"],
});
