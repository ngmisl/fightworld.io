import { useEffect } from "react";
import { useSnapshot } from "valtio";
import authStore from "~/authStore";
import { useLoginMutation } from "~/generated/graphql";

export function RequestLogin() {
  const auth = useSnapshot(authStore);
  const [result, loginMutation] = useLoginMutation();

  useEffect(() => {
    console.log("fetch the token");
    loginMutation({ address: auth.address!, signature: auth.signature! });
  }, []);

  const access_token = result.data?.login?.access_token ?? null;
  console.log("access_token", access_token);
  useEffect(() => {
    console.log("set token");
    auth.setAccessToken(access_token);
  }, [access_token]);

  return (
    <>
      <button disabled={true}>Logging in...</button>
    </>
  );
}
