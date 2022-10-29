import { Outlet, Navigate } from "react-router-dom";
import { Auth, AuthContext } from "~/context/AuthContext";
import { useContext } from "react";

export function PublicRoutes() {
  const { auth } = useContext(AuthContext) as Auth;

  return (
        !auth.access_token ? <Outlet /> : <Navigate to="/" replace />
  );
}