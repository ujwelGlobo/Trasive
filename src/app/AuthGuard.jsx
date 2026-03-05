import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/core/auth/AuthProvider";
import { ROLES } from "@/utils/constants/constants";

const AuthGuard = ({ allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Wait until auth state is checked
  if (loading) {
    return null; // or loader component
  }

  // If not logged in → redirect
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If route has role restriction and user doesn't match
  if (allowedRoles && !allowedRoles.includes(user?.roleType)) {
    // Company admin can access everything
    if (user?.roleType === ROLES.COMPANY_ADMIN) {
      return <Outlet />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;