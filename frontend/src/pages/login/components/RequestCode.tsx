import { useEffect } from "react";
import { Auth } from "~/context/AuthContext";
import { useAuthenticationCodeQuery } from "~/generated/graphql";

export function RequestCode({auth, setAuth}: Auth) {

      const [codeResult] = useAuthenticationCodeQuery({
        variables: { address: auth.address! },
      });
    
      const code = codeResult.data?.authenticationCode.code;
      useEffect(() => {
        setAuth({ ...auth, code });
      }, [code]);

      return <button disabled={true}>Loading...</button>
    
}