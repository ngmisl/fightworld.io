import { useEffect } from "react";
import { Auth } from "~/context/AuthContext";
import { useLoginQuery } from "~/generated/graphql";

export function RequestLogin({auth, setAuth}: Auth) {

      const [loginResult] = useLoginQuery({
        variables: {
          address: auth.address!,
          signature: auth.signature!,
        }
      })

      const access_token = loginResult.data?.login?.access_token;
      useEffect(() => {
        setAuth({ ...auth, access_token });
      }, [access_token]);

      return <button disabled={true}>Loading...</button>
}