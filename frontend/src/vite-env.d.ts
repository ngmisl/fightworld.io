/// <reference types="vite/client" />

type ethereumProvider = import("ethers").providers.ExternalProvider & { selectedAddress: string} 
interface Window {
  ethereum: ethereumProvider
}
