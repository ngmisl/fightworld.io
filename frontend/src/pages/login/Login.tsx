import { RequestAccounts } from "./components/RequestAccounts";
import { RequestCode } from "./components/RequestCode";
import { RequestSignature } from "./components/RequestSignature";
import { RequestLogin } from "./components/RequestLogin";
import { useSnapshot } from "valtio";
import authStore from "~/authStore";

export function Login() {
  const auth = useSnapshot(authStore);

  if(!auth.address) return <RequestAccounts />
  if(!auth.code && !auth.accessToken) return <RequestCode />
  if(!auth.signature && !auth.accessToken) return <RequestSignature />
  if(!auth.accessToken) return <RequestLogin />
  return <></>
}