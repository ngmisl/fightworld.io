import { providers } from "ethers";
import { useQuery } from "react-query";
import { useSnapshot } from "valtio";
import authStore from "~/authStore";

export const RequestAccounts = () => {
  const auth = useSnapshot(authStore);

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
    await requestAccountsResult.refetch();
  };

  if (requestAccountsResult.isFetching) return <button disabled={true}>Waiting for connection...</button>;

  if (requestAccountsResult.isError)
    return (
      <>
        <button onClick={handleConnect}>Click to connect</button>
        <span>Something went wrong trying to connect, try again</span>
      </>
    );

  return <button onClick={handleConnect}>Click to connect</button>;
};
