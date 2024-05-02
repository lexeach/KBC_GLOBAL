import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useDisconnect } from 'wagmi'

export default function ConnectButton() {
  // 4. Use modal hook
  const { open } = useWeb3Modal()
  const { disconnect } = useDisconnect()
  const { isDisconnected } = useAccount()

  return (
      <button className='mybtn1' onClick={() => isDisconnected ? open() : disconnect()}>{isDisconnected ? "Connect Wallet": "Disconnect"}</button>
  )
}