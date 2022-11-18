import { providers } from "ethers";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useSnapshot } from "valtio";
import authStore from "~/stores/authStore";
import { useCodeMutation } from "~/generated/graphql";
import { Button } from "~/ui/Button";
import messageStore from "~/stores/messageStore";

export const RequestSignature = () => {
  const auth = useSnapshot(authStore);
  const message = useSnapshot(messageStore);

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
    message.clearMessage();
    await codeMutation({ address: auth.address! });
  };

  if (signMessageResult.isError) {
    message.setError("Something went wrong trying to connect, try again.");
  }

  if (signMessageResult.isFetching)
    return (
      <Button type="secondary" size="normal" disabled={true}>
        Waiting for signature...
      </Button>
    );

  return (
    <Button type="primary" size="normal" onClick={handleConnect}>
      Click to sign in
    </Button>
  );
};
