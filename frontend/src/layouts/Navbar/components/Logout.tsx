import authStore from "~/stores/authStore";
import { useLogoutMutation } from "~/generated/graphql";
import { Button } from "~/ui/Button";

export const Logout = () => {
  const [, query] = useLogoutMutation();

  const logout = () => {
    query({});
    authStore.setSignature(null);
    authStore.setAccessToken(null);
  };

  return (
    <Button type="warning" size="normal" onClick={logout}>
      Logout
    </Button>
  );
};
