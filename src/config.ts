import { http, createConfig } from 'wagmi'
// import { kbcTestnet } from 'wagmi/chains'
// import {kbcTestnet} from 'wagmi/chains'
// import { kbcTestnet } from './kbcTestnet'
// import { bscTestnet } from 'wagmi/chains'
import { kbcMainnet } from './customChainKBC';

console.log("KBC Testnet: ", kbcMainnet)

export const config = createConfig({
  chains: [kbcMainnet],
  transports: {
    [kbcMainnet.id]: http(),
  },
})