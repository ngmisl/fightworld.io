import authStore from "~/authStore";
import { useLogoutMutation, useMeQuery } from "~/generated/graphql";

export function Home() {
  const [, query] = useLogoutMutation();

  const [, meQuery] = useMeQuery({
    pause: true,
  });

  const logout = () => {
    query({});
    authStore.setSignature(null);
    authStore.setAccessToken(null);
  };

  return (
    <>
      <button onClick={logout}>Logout</button>
      <button onClick={meQuery}>Fetch me data</button>
    </>
  );
}
