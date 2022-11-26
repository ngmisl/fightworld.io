import { Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "~/pages/PrivateRoutes";
import { PublicRoutes } from "~/pages/PublicRoutes";
import { Home } from "~/pages/Home/Home";

import { User } from "~/pages/User/User";
import { Navbar } from "../Navbar";
import { Message } from "~/layouts/Message";

export const MainLayout = () => {
  return (
    <div className="p-3 max-w-5xl m-auto bg-gray-100 h-screen">
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/user/:id" element={<User />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="*" element={<h1>Invalid path</h1>} />
      </Routes>
      <Message />
    </div>
  );
};
