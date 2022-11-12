import authStore from "~/authStore";
import { useLogoutMutation, useMeQuery } from "~/generated/graphql";
import { Button } from "~/ui";

export const Home = () => {
  const [, query] = useLogoutMutation();

  const [me, meQuery] = useMeQuery({
    pause: true,
  });

  console.log(me);

  const logout = () => {
    query({});
    authStore.setSignature(null);
    authStore.setAccessToken(null);
  };

  return (
    <>
      <button onClick={logout}>Logout</button>
      <Button onClick={meQuery}>Fetch me data</Button>
    </>
  );
};
