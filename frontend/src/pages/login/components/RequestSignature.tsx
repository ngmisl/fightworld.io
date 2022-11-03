import { providers } from "ethers";
import { useQuery } from "react-query";
import { useSnapshot } from "valtio";
import authStore from "~/authStore";

export function RequestSignature() {
    const auth = useSnapshot(authStore);

    const ethersProvider = new providers.Web3Provider(window.ethereum);
      const signer = ethersProvider.getSigner();

      const signMessageResult = useQuery(
        ["signMessage", auth.code],
        async () => {
          const signature = await signer.signMessage(auth.code!.toString());
          auth.setSignature(signature)
          return signature;
        },
        {
          enabled: false,
          retry: false,
        }
      );

      const handleConnect = async () => {
            await signMessageResult.refetch();
        };
    
        if(signMessageResult.isFetching) return <button disabled={true}>Loading...</button>

        if(signMessageResult.isError) return (
            <>
                  <button onClick={handleConnect}>Click to sign in</button>
                  <span>Something went wrong trying to connect, try again</span>
            </>
            )
      

      return <button onClick={handleConnect}>Click to sign in</button>
}