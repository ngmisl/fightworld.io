import { useEffect } from "react";
import { useSnapshot } from "valtio";
import authStore from "~/authStore";
import { useLoginMutation } from "~/generated/graphql";

export function RequestLogin() {
  const auth = useSnapshot(authStore);
  const [result, query] = useLoginMutation();

  useEffect(() => {
    query({ address: auth.address!, signature: auth.signature! });
  }, [auth.signature]);

  const access_token = result.data?.login?.access_token ?? null;
  useEffect(() => {
    auth.setAccessToken(access_token);
  }, [access_token]);

  return (
    <>
      <button disabled={true}>Logging in...</button>
    </>
  );
}
