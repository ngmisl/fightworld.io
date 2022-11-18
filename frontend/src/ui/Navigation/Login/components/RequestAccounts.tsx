import { providers } from "ethers";
import { useQuery } from "react-query";
import { useSnapshot } from "valtio";
import authStore from "~/stores/authStore";
import messageStore from "~/stores/messageStore";
import { Button } from "~/ui/Button";

export const RequestAccounts = () => {
  const auth = useSnapshot(authStore);
  const message = useSnapshot(messageStore);

  const ethersProvider = new providers.Web3Provider(window.ethereum);
  const signer = ethersProvider.getSigner();

  const requestAccountsResult = useQuery(
    "requestAccounts",
    async (): Promise<string> => {
      await ethersProvider.send("eth_requestAccounts", []);
      const address = await signer.getAddress();
      auth.setAddress(address);
      return address;
    },
    {
      enabled: false,
      retry: false,
    }
  );

  const handleConnect = async () => {
    message.clearMessage();
    await requestAccountsResult.refetch();
  };

  if (requestAccountsResult.isError) {
    message.setError("Failed to fetch account.");
  }

  if (requestAccountsResult.isFetching)
    return (
      <Button type="secondary" size="normal" disabled={true}>
        Waiting for connection...
      </Button>
    );

  return (
    <Button type="primary" size="normal" onClick={handleConnect}>
      Click to connect
    </Button>
  );
};
