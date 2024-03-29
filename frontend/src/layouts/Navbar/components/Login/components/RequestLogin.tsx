import { useEffect } from "react";
import { useSnapshot } from "valtio";
import authStore from "~/stores/authStore";
import { useLoginMutation } from "~/generated/graphql";

export const RequestLogin = () => {
  const auth = useSnapshot(authStore);
  const [result, loginMutation] = useLoginMutation();

  useEffect(() => {
    loginMutation({ address: auth.address!, signature: auth.signature! });
  }, []);

  const access_token = result.data?.login?.access_token ?? null;
  useEffect(() => {
    auth.setAccessToken(access_token);
  }, [access_token]);

  return (
    <>
      <button disabled={true}>Logging in...</button>
    </>
  );
};
