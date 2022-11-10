import authStore from "~/authStore";
import { useLogoutMutation, useMeQuery } from "~/generated/graphql";

export function Home() {
  const [result, query] = useLogoutMutation();

  const [me] = useMeQuery();

  const logout = () => {
    query({});
    authStore.setSignature(null);
    authStore.setAccessToken(null);
  };

  return <button onClick={logout}>Logout</button>;
}
