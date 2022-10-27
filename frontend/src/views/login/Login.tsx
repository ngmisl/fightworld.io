import { useAuthenticationCodeQuery } from "~/generated/graphql";
import { Auth, AuthContext } from "~/context/AuthContext";
import { useContext, useEffect } from "react";
import { useQuery } from "react-query";

function Login() {
  const { auth, setAuth } = useContext(AuthContext) as Auth;
  const signer = auth.ethProvider.getSigner();

  //Attempt to get refresh_token from local storage and fetch access_token

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

  const [result] = useAuthenticationCodeQuery({
    variables: { address: auth.address! },
    pause: auth.address === undefined,
  });

  const signMessageResult = useQuery(
    ["signMessage", auth.code],
    async () => {
      const signature = await signer.signMessage(auth.code!.toString());
      //Get the access_token and refresh_token
      setAuth({
        ...auth,
        access_token: "temporary",
      });
      return signature;
    },
    {
      enabled: !!auth.code && !auth.access_token,
      retry: false,
    }
  );

  const code = result.data?.authenticationCode.code;
  useEffect(() => {
    setAuth({ ...auth, code });
  }, [code]);

  const handleConnect = async () => {
    await requestAccountsResult.refetch();
  };

  if (requestAccountsResult.isLoading || requestAccountsResult.isFetching)
    return <div>Loading...</div>;
  if (requestAccountsResult.isError)
    return <div>Something went wrong connecting to wallet</div>;

  return (
    <>
      <button onClick={handleConnect}>Click to connect</button>
    </>
  );
}

export default Login;
