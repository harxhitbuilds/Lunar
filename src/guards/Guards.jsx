import { Navigate } from "react-router-dom";

import useAuthStore from "@/stores/useAuthStore";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/signup" replace />;
  }
  return children;
};

export const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};
