// src/routes/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" replace />; // login page ada di "/"
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    const roleRedirect = {
      admin: "/dashboard",
      pemilik: "/dashboard",
      petani: "/kolam",
    };
    return <Navigate to={roleRedirect[role] || "/"} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
