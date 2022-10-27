import { AuthContext, AuthData } from "~/context/AuthContext";
import detectEthereumProvider from "@metamask/detect-provider";
import { providers } from "ethers";
import { useMemo, useState } from "react";
import Login from "../login/Login";

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
      <Login />
    </AuthContext.Provider>
  );
}

export default Main;
