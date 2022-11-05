import { RequestAccounts } from "./components/RequestAccounts";
import { RequestSignature } from "./components/RequestSignature";
import { RequestLogin } from "./components/RequestLogin";
import { useSnapshot } from "valtio";
import authStore from "~/authStore";

export function Login() {
  const auth = useSnapshot(authStore);

  // Ask to connect to metamask
  if (!auth.address) return <RequestAccounts />;

  // Fetches code and request to sign with metamask
  if (!auth.signature && !auth.accessToken) return <RequestSignature />;

  // Automatically tries to login
  if (!auth.accessToken) return <RequestLogin />;
  return <></>;
}
