import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  allowedRole,
}) {
  const token =
    localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  const decodedToken = JSON.parse(
    atob(token.split(".")[1])
  );

  if (
    allowedRole &&
    decodedToken.role !== allowedRole
  ) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;