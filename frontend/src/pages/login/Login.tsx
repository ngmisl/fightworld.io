import { Auth, AuthContext } from "~/context/AuthContext";
import { useContext, useEffect } from "react";
import { RequestAccounts } from "./components/RequestAccounts";
import { RequestCode } from "./components/RequestCode";
import { RequestSignature } from "./components/RequestSignature";
import { RequestLogin } from "./components/RequestLogin";

export function Login() {
  const { auth, setAuth } = useContext(AuthContext) as Auth;

  useEffect(() => {
    setAuth({ ...auth, address: window.ethereum.selectedAddress });
  }, [window.ethereum.selectedAddress])

  if(!auth.address) return <RequestAccounts auth={auth} setAuth={setAuth} />
  if(!auth.code && !auth.access_token) return <RequestCode auth={auth} setAuth={setAuth} />
  if(!auth.signature && !auth.access_token) return <RequestSignature auth={auth} setAuth={setAuth} />
  if(!auth.access_token) return <RequestLogin auth={auth} setAuth={setAuth} />
  return <></>
}