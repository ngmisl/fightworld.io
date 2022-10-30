import { useQuery } from "react-query";
import { Auth } from "~/context/AuthContext";

export function RequestAccounts({auth, setAuth}: Auth) {
      const signer = auth.ethProvider.getSigner();

      const requestAccountsResult = useQuery(
            "requestAccounts",
            async (): Promise<string> => {
              await auth.ethProvider.send("eth_requestAccounts", []);
              const address = await signer.getAddress();
              setAuth({ ...auth, address });
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

      if(requestAccountsResult.isFetching) return <button disabled={true}>Loading...</button>

      if(requestAccountsResult.isError) return (
      <>
            <button onClick={handleConnect}>Click to connect</button>
            <span>Something went wrong trying to connect, try again</span>
      </>
      )

      return <button onClick={handleConnect}>Click to connect</button>
}