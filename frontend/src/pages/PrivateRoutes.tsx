import { Outlet, Navigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import authStore from "~/stores/authStore";

export const PrivateRoutes = () => {
  const auth = useSnapshot(authStore);

  return auth.accessToken ? <Outlet /> : <Navigate to="/" replace />;
};
