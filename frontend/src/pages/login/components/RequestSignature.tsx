import { useQuery } from "react-query";
import { Auth } from "~/context/AuthContext";

export function RequestSignature({auth, setAuth}: Auth) {
      const signer = auth.ethProvider.getSigner();

      const signMessageResult = useQuery(
        ["signMessage", auth.code],
        async () => {
          const signature = await signer.signMessage(auth.code!.toString());
          setAuth({ ...auth, signature });
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