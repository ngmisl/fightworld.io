import { useAuthenticationCodeQuery, useLoginQuery } from "~/generated/graphql";
import { Auth, AuthContext } from "~/context/AuthContext";
import { useContext, useEffect } from "react";
import { useQuery } from "react-query";

export function Login() {
  const { auth, setAuth } = useContext(AuthContext) as Auth;
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

  const [codeResult] = useAuthenticationCodeQuery({
    variables: { address: auth.address! },
    pause: auth.address === undefined,
  });

  const code = codeResult.data?.authenticationCode.code;
  useEffect(() => {
    setAuth({ ...auth, code });
  }, [code]);

  
  const [loginResult] = useLoginQuery({
    variables: {
      address: auth.address!,
      signature: auth.signature!,
    },
    pause: auth.signature === undefined
  })

  console.log(loginResult)
  const access_token = loginResult.data?.login?.access_token;
  useEffect(() => {
    console.log(access_token)
    setAuth({ ...auth, access_token });
  }, [access_token]);

  const signMessageResult = useQuery(
    ["signMessage", auth.code],
    async () => {
      const signature = await signer.signMessage(auth.code!.toString());
      setAuth({ ...auth, signature });
      return signature;
    },
    {
      enabled: !!auth.code && !auth.access_token,
      retry: false,
    }
  );

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