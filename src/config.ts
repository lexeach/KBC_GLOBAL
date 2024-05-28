import { http, createConfig } from 'wagmi'
// import { kbcTestnet } from 'wagmi/chains'
// import {kbcTestnet} from 'wagmi/chains'
// import { kbcTestnet } from './kbcTestnet'
// import { bscTestnet } from 'wagmi/chains'
import { kbcTestnet } from './customChains';

console.log("KBC Testnet: ", kbcTestnet)

export const config = createConfig({
  chains: [ kbcTestnet],
  transports: {
    [kbcTestnet.id]: http(),
  },
})