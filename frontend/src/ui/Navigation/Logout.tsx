import authStore from "~/authStore";
import { useLogoutMutation } from "~/generated/graphql";

export const Logout = () => {
  const [, query] = useLogoutMutation();

  const logout = () => {
    query({});
    authStore.setSignature(null);
    authStore.setAccessToken(null);
  };

  return <button onClick={logout}>Logout</button>;
};
