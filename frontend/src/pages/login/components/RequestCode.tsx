import { useEffect } from "react";
import { useSnapshot } from "valtio";
import authStore from "~/authStore";
import { useAuthenticationCodeQuery } from "~/generated/graphql";

export function RequestCode() {
    const auth = useSnapshot(authStore);
    
      const [codeResult] = useAuthenticationCodeQuery({
        variables: { address: auth.address! },
      });
    
      const code = codeResult.data?.authenticationCode.code ?? null
      useEffect(() => {
        auth.setCode(code)
      }, [code]);

      return <button disabled={true}>Loading...</button>
    
}