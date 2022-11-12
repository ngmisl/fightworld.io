import { providers } from "ethers";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useSnapshot } from "valtio";
import authStore from "~/authStore";
import { useCodeMutation } from "~/generated/graphql";

export const RequestSignature = () => {
  const auth = useSnapshot(authStore);

  const ethersProvider = new providers.Web3Provider(window.ethereum);
  const signer = ethersProvider.getSigner();

  const [codeResult, codeMutation] = useCodeMutation();

  const code = codeResult.data?.authenticationCode.code;

  const signMessageResult = useQuery(
    ["signMessage", code],
    async () => {
      const signature = await signer.signMessage(code!.toString());
      auth.setSignature(signature);
      return signature;
    },
    {
      enabled: false,
      retry: false,
    }
  );

  useEffect(() => {
    if (code) {
      signMessageResult.refetch();
    }
  }, [code]);

  const handleConnect = async () => {
    await codeMutation({ address: auth.address! });
  };

  if (signMessageResult.isFetching) return <button disabled={true}>Waiting for signature...</button>;

  if (signMessageResult.isError)
    return (
      <>
        <button onClick={handleConnect}>Click to sign in</button>
        <span>Something went wrong trying to connect, try again</span>
      </>
    );

  return <button onClick={handleConnect}>Click to sign in</button>;
};
