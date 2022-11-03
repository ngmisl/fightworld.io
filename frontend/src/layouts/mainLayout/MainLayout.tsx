import { Routes, Route } from "react-router-dom";
import { Login } from "~/pages/login/Login";
import { PrivateRoutes } from "~/pages/PrivateRoutes";
import { PublicRoutes } from "~/pages/PublicRoutes"
import { Home } from "~/pages/home/Home";

export function MainLayout() {

  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="*" element={<h1>Invalid path</h1>} />
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
