import { Outlet, Navigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import authStore from "~/authStore";

export function PrivateRoutes() {
  const auth = useSnapshot(authStore);

  return auth.accessToken ? <Outlet /> : <Navigate to="/login" replace />;
}
