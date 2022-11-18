import { Outlet, Navigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import authStore from "~/stores/authStore";

export const PublicRoutes = () => {
  const auth = useSnapshot(authStore);

  return !auth.accessToken ? <Outlet /> : <Navigate to={`user/${auth.address}`} replace />;
};
