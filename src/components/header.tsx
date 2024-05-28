import { useAccount, useReadContract } from "wagmi";
import { formatEther } from "ethers/utils";
import { BigNumberish } from "ethers";

import {
  contract_abi,
  contract_address,
  contract_address_stable_coin_usdt,
  contract_abi_stabel_coin_usdt,
  contract_address_bnb_kbc,
  contract_abi_bnb_kbc,
  contract_price_pool,
} from "../contract";
import { config } from "../config";
import CountdownTimer from "./CountdownTimer";
import { useState, useEffect } from "react";
import { check_usd_price } from "../utils/convert-to-eth";

const Header = () => {
  const { address } = useAccount();

  const { data } = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "income",
    args: [address],
  });
  // const [kbcVal, setKbcVal] = useState<number>(1);
  const [usdVal, setUsdVal] = useState<string>("");

  interface BalanceDetail {
    value: number | undefined | string;
    name: string;
  }

  const Balance_detail: BalanceDetail[] = [
    {
      value:
        typeof data === "object" && Array.isArray(data) && data.length > 0
          ? parseFloat(formatEther(data[0])).toFixed(4)
          : 0,
      name: "Direct Income",
    },
    {
      value:
        typeof data === "object" && Array.isArray(data) && data.length > 0
          ? parseFloat(formatEther(data[1])).toFixed(4)
          : 0,
      name: "On Team ROI",
    },
    {
      value:
        typeof data === "object" && Array.isArray(data) && data.length > 0
          ? parseFloat(formatEther(data[2])).toFixed(4)
          : 0,
      name: "Top 4 Income",
    },
    {
      value:
        typeof data === "object" && Array.isArray(data) && data.length > 0
          ? parseFloat(formatEther(data[3])).toFixed(4)
          : 0,
      name: "Total Income",
    },
    {
      value:
        typeof data === "object" && Array.isArray(data) && data.length > 0
          ? parseFloat(formatEther(data[4])).toFixed(4)
          : 0,
      name: "Taken Income",
    },
    {
      value:
        typeof data === "object" && Array.isArray(data) && data.length > 0
          ? parseFloat(formatEther(data[5])).toFixed(4)
          : 0,
      name: "Balance Income",
    },
  ];

  // function 11
  const lastTopUp = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "lastTopup",
    args: [address],
    config,
  });

  const lastToUpVal = lastTopUp.data
    ? parseFloat(formatEther(lastTopUp.data as BigNumberish)).toFixed(4)
    : 0;

  // function 20
  const stakedUSDT = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "stakedUSDT",
    args: [address],
    config,
  });
  const BalanceOfKBC = useReadContract({
    abi: contract_abi_bnb_kbc,
    address: contract_address_bnb_kbc,
    functionName: "balanceOf",
    args: [contract_price_pool],
    config,
  });
  const BalanceOfStableCoin = useReadContract({
    abi: contract_abi_stabel_coin_usdt,
    address: contract_address_stable_coin_usdt,
    functionName: "balanceOf",
    args: [contract_price_pool],
    config,
  });

  const USD_price = check_usd_price(
    BalanceOfKBC.data as bigint,
    BalanceOfStableCoin.data as bigint
  );
  useEffect(() => {
    setUsdVal(USD_price.toString());
  }, [BalanceOfKBC.data, BalanceOfStableCoin.data]);

  const stakedUSDTVal = stakedUSDT.data
    ? parseFloat(formatEther(stakedUSDT.data as BigNumberish)).toFixed(4)
    : 0;

  // function 9
  const globalPool = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "globalPool",
    config,
  });

  const userData = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "users",
    args: [address],
    config,
  });

  let userDetail: bigint[] = [];
  userDetail = userData?.data as bigint[];
  // console.log("Status now: ",;
  let stakesTime = userDetail ? Number(userDetail[11]) : 0;
  const date = new Date(stakesTime * 1000);

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }; //currentRoundTime.toLocaleTimeString("en-US", options);
  const formattedTime = date.toLocaleTimeString("en-US", options);

  const globalethValue = globalPool.data
    ? parseFloat(formatEther(globalPool.data as BigNumberish)).toFixed(4)
    : 0;

  interface Header_Two {
    value: number | undefined | string;
    name: string;
  }

  // function 23
  const withdrawableROI = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "withdrawableROI",
    args: [address],
    config,
  });

  const withdrawableROIEth = withdrawableROI.data
    ? parseFloat(formatEther(withdrawableROI.data as BigNumberish)).toFixed(4)
    : 0;

  // insurancePool
  // function 9
  const insurancePool = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "insurancePool",
    config,
  });

  const insuranceethValue1 = insurancePool.data
    ? parseFloat(formatEther(insurancePool.data as BigNumberish)).toFixed(4)
    : 0;

  const insuranceethValue = (
    parseFloat(insuranceethValue1.toString()) / parseFloat(usdVal)
  ).toFixed(4);

  const Header_Two: Header_Two[] = [
    {
      value: lastToUpVal,
      name: "Last TopUp",
    },
    {
      value: globalethValue,
      name: "GlobalPool KBC",
    },
    {
      value: stakedUSDTVal,
      name: "Staked USDT",
    },
    {
      value: withdrawableROIEth,
      name: "With Drawable ROI",
    },
    {
      value: insuranceethValue1,
      name: "InsurancePool KBC",
    },
    {
      value: insuranceethValue,
      name: "InsurancePool USDT",
    },
  ];

  return (
    <>
      <div className="head-card skew mx-5 mt-4">
        <div className="row">
          {Balance_detail.map((element: BalanceDetail, i) => (
            <div className="col-lg-2 col-sm-6" key={i}>
              <div className="box">
                <p className="cards-numbers">
                  {element.value}
                  <span className="sub-number"> USDT</span>
                </p>
                <p className="cards-title">{element.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="head-card skew mx-5 mt-4">
        <div className="row">
          {Header_Two.map((element: BalanceDetail, i) => (
            <div className="col-lg-2 col-sm-6" key={i}>
              <div className="box">
                <p className="cards-numbers">
                  {element.value}
                  {/* <span className="sub-number"> USDT</span> */}
                </p>
                <p className="cards-title">{element.name}</p>
                {element.name === "With Drawable ROI" && (
                  <p id="countDownTinerROI" className="text-pink fs-3">
                    {" "}
                    <CountdownTimer targetTime={formattedTime} />
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Header;
