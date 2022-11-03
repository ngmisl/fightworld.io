import { providers } from "ethers";
import { proxy } from "valtio"

export interface AuthStore {
    address: string | null;
    setAddress: (address: string) => void;
    code: number | null;
    setCode: (code: number | null) => void;
    accessToken: string | null;
    setAccessToken: (accessToken: string | null) => void;
    signature: string | null;
    setSignature: (signature: string) => void;
}

const authStore = proxy<AuthStore>({
    address: null,
    setAddress(address: string) {
        authStore.address = address
    },
    code: null,
    setCode(code: number | null) {
        authStore.code = code
    },
    accessToken: null,
    setAccessToken(accessToken: string | null) {
        authStore.accessToken = accessToken
    },
    signature: null,
    setSignature(signature: string) {
        authStore.signature = signature
    }
})

export default authStore;