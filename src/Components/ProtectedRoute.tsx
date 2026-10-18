import { Navigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../utils/localStorage";

type Role = "admin" | "faculty" | "student";

export const ProtectedRoute = ({ roles }: { roles: Role[] }) => {
  const location = useLocation();
  const token = getToken();

  if (!token) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  try {
    const { role, exp } = jwtDecode<{ role?: Role; exp?: number }>(token);
    const isExpired = exp ? exp * 1000 < Date.now() : false;

    if (isExpired || !role || !roles.includes(role)) {
      return <Navigate to="/" replace />;
    }
  } catch {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
