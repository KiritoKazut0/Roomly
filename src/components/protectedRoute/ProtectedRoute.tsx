import React from "react";
import type { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

// Types
interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children?: ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  isAuthenticated, 
  children, 
  redirectTo = "/" 
}) => {
  console.log({
    isAuthenticated, 
    redirectTo, 
    children
  });

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;