import { AuthContext, AuthData } from "~/context/AuthContext";
import { providers } from "ethers";
import { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "~/pages/pages/Login";
import { PrivateRoutes } from "~/pages/PrivateRoutes";
import { PublicRoutes } from "~/pages/PublicRoutes"
import { Home } from "~/pages/pages/Home";

interface main {
  provider: providers.ExternalProvider;
}
function Main({ provider }: main) {
  const ethersProvider = new providers.Web3Provider(provider);
  const [auth, setAuth] = useState<AuthData>({
    ethProvider: ethersProvider,
  });
  const authProvider = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  return (
    <AuthContext.Provider value={authProvider}>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="*" element={<h1>Invalid path</h1>} />
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default Main;
