import { useAccount, useReadContract } from "wagmi";
import { formatEther } from "ethers/utils";
import { BigNumberish } from "ethers";

import { contract_abi, contract_address } from "../contract";
import { config } from "../config";

const Header = () => {
  const { address } = useAccount();
  const { data } = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "income",
    args: [address],
  });

  interface BalanceDetail {
    value: number | undefined | string;
    name: string;
  }

  const Balance_detail: BalanceDetail[] = [
    {
      value:
        typeof data === "object" && Array.isArray(data) && data.length > 0
          ? formatEther(data[0])
          : 0,
      name: "Direct Income",
    },
    {
      value:
        typeof data === "object" && Array.isArray(data) && data.length > 0
          ? formatEther(data[1])
          : 0,
      name: "On Team ROI",
    },
    {
      value:
        typeof data === "object" && Array.isArray(data) && data.length > 0
          ? formatEther(data[2])
          : 0,
      name: "Top 4 Income",
    },
    {
      value:
        typeof data === "object" && Array.isArray(data) && data.length > 0
          ? formatEther(data[3])
          : 0,
      name: "Total Income",
    },
    {
      value:
        typeof data === "object" && Array.isArray(data) && data.length > 0
          ? formatEther(data[4])
          : 0,
      name: "Taken Income",
    },
    {
      value:
        typeof data === "object" && Array.isArray(data) && data.length > 0
          ? formatEther(data[5])
          : 0,
      name: "Balance Income",
    },
  ];

    // function 11
    const lastTopUp = useReadContract({
      abi: contract_abi,
      address: contract_address,
      functionName: "lastTopup",
      args:[address],
      config,
    });

    const lastToUpVal = lastTopUp.data
    ? formatEther(lastTopUp.data as BigNumberish)
    : 0;


    // function 20
    const stakedUSDT = useReadContract({
      abi: contract_abi,
      address: contract_address,
      functionName: "stakedUSDT",
      args:[address],
      config,
    });

    const stakedUSDTVal = stakedUSDT.data
    ? formatEther(stakedUSDT.data as BigNumberish)
    : 0;


  //   // function 22
  //   const TopUpTime = useReadContract({
  //   abi: contract_abi,
  //   address: contract_address,
  //   functionName: "topUpTime",
  //   args:[address],
  //   config,
  // });

  // const topUpTimeVal = dayjs(Number(TopUpTime.data) * 1000).format("DD-MMM-YYYY") ||
  // "00-Month-0000";

         // function 23
    // const totalDeposit = useReadContract({
    //   abi: contract_abi,
    //   address: contract_address,
    //   functionName: "totalDeposit",
    //   args:[address],
    //   config,
    // });

    // const totalDepositVal = totalDeposit.data
    // ? formatEther(totalDeposit.data as BigNumberish)
    // : 0;

      // function 9
  const globalPool = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "globalPool",
    config,
  });

  const globalethValue = globalPool.data
    ? formatEther(globalPool.data as BigNumberish)
    : 0;

  interface Header_Two {
    value: number | undefined | string;
    name: string;
  }

  // insurancePool
        // function 9
        const insurancePool = useReadContract({
          abi: contract_abi,
          address: contract_address,
          functionName: "insurancePool",
          config,
        });
      
        const insuranceethValue = insurancePool.data
          ? formatEther(globalPool.data as BigNumberish)
          : 0;

  const Header_Two: Header_Two[] = [
    {
      value:  lastToUpVal,
      name: "Last TopUp",
    },
    {
      value:globalethValue,
      name: "GlobalPool KBC",
    },
    {
      value:stakedUSDTVal,
      name: "Staked USDT",
    },
    {
      value:globalethValue,
      name: "GlobalPool USDT",
    },
    {
      value:insuranceethValue,
      name: "InsurancePool KBC",
    },
    {
      value:insuranceethValue,
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Header;
