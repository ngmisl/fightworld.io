import { proxy } from "valtio";

export interface AuthStore {
  address: string | null;
  setAddress: (address: string | null) => void;
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  signature: string | null;
  setSignature: (signature: string | null) => void;
}

const authStore = proxy<AuthStore>({
  address: null,
  setAddress(address: string | null) {
    authStore.address = address;
  },
  accessToken: null,
  setAccessToken(accessToken: string | null) {
    authStore.accessToken = accessToken;
  },
  signature: null,
  setSignature(signature: string | null) {
    authStore.signature = signature;
  },
});

export default authStore;
