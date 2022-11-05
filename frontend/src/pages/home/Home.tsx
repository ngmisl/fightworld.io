import authStore from "~/authStore";
import { useLogoutMutation } from "~/generated/graphql";

export function Home() {
  const [result, query] = useLogoutMutation()

  const logout = () => {
    query({})
    authStore.setCode(null)
    authStore.setSignature(null)
    authStore.setAccessToken(null)
  }
  
  return <button onClick={logout}>Logout</button>
}