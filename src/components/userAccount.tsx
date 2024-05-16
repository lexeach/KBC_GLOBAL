import { useAccount, useBalance } from "wagmi";

export default function UserAccount() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { data } = useBalance({
    address,
  });

  const formatted = data && Number(data?.formatted).toFixed(8);

  if (isConnecting)
    return (
      <div className="address">
        <div className="head-card mx-5 mt-4 width-100">Connecting… </div>
      </div>
    );
  if (isDisconnected)
    return (
      <div className="address">
        <div className="head-card mx-5 mt-4 width-100">Offline</div>
      </div>
    );
  return (
    <div className="address">
      <div className="head-card mx-5 mt-4 width-100">
        <p className="cards-numbers">
          {formatted} {data?.symbol}
        </p>
        <p className="cards-title">{address}</p>
      </div>
    </div>
  );
}
