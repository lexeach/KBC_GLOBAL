import { useAccount, useReadContract } from "wagmi";
import { Button, Form, Input } from "antd";
import { formatEther } from "ethers/utils";
import dayjs from "dayjs";
import { BigNumberish } from "ethers";

import { contract_address, contract_abi } from "../contract";
import { config } from "../config";
import { useEffect, useState } from "react";
import CountdownTimer from "./CountdownTimer";

const UserInfo = () => {
  const { address } = useAccount();
  // const address = "0xd7d851e21eF10B475F94dFB3121051175608e7Fd";
  const [currentR, setCurrentR] = useState(0);
  const [currentR1, setCurrentR1] = useState(0);
  const [rewardInfoRank, setRewardInfoRank] = useState(0);
  const [userDetail, setUserDetail] = useState([]);
  const [totalDepositRes, setTotalDepositRes] = useState(0);
  const [refferedUser, setRefferedUser] = useState(0);
  const [levelIncomeReceived, setLevelIncomeReceived] = useState(0);
  const [userTurnOverRes, setUserTurnOverRes] = useState(0);
  const [balanceIncome, setBalanceIncome] = useState(0);

  const userData = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "users",
    args: [address],
    config,
  });
  console.log("ITs fetching Data of User Admin: ", userData.data);
  // let userDetail: bigint[] = [];
  // let userId = userData.data ? userData.data[1] : 0;
  useEffect(() => {
    if (userData?.data) {
      const userDetailData = userData.data as bigint[];
      setUserDetail(userDetailData);
      setRefferedUser(userDetailData ? userDetailData[5] : 0);
      setLevelIncomeReceived(userDetailData ? userDetailData[9] : 0);
    }
  }, [userData.data]);

  // function 22
  const TopUpTime = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "topUpTime",
    args: [address],
    config,
  });
  const CurrRoundStartTime = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "currRoundStartTime",
    config,
  });
  const TotalTaken = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "totalTaken",
    args: [address],
    config,
  });

  const TotalDeposit = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "totalDeposit",
    args: [address],
    config,
  });

  const currentRoundTime = new Date(Number(CurrRoundStartTime.data) * 1000);

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  const formattedRound = currentRoundTime.toLocaleTimeString("en-US", options);

  // function 16
  const RegTime = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "regTime",
    args: [address],
    config,
  });

  const totalDeposit = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "totalDeposit",
    args: [address],
    config,
  });
  const incomeOf = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "income",
    args: [address],
  });
  useEffect(() => {
    setBalanceIncome(
      incomeOf.data ? parseFloat(formatEther(incomeOf.data[5])).toFixed(4) : 0
    );
  }, [incomeOf.data ? incomeOf.data : 0]);

  // let totalDepositRes: bigint[] = [];
  // totalDepositRes = totalDeposit?.data as bigint[];
  useEffect(() => {
    setTotalDepositRes(totalDeposit?.data);
  }, [totalDeposit.data ? totalDeposit.data : 0]);

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

  const stakedUSDTVal = stakedUSDT.data
    ? parseFloat(formatEther(stakedUSDT.data as BigNumberish)).toFixed(4)
    : 0;
  // console.log("User Detail: ", userDetail, userDetail.length, userId);
  const userDetail_arr = [
    {
      id: "1",
      name: "User ID",
      value: userDetail && userDetail.length > 0 ? Number(userDetail[1]) : 0,
    },
    {
      id: "2",
      name: "Referrer ID",
      value: userDetail && userDetail.length > 0 ? Number(userDetail[2]) : 0,
    },
    // {
    //   id: "3",
    //   name: "Staked KBC",
    //   value:
    //     userDetail && userDetail.length > 0
    //       ? parseFloat(formatEther(userDetail[3])).toFixed(4)
    //       : 0,
    // },
    // {
    //   id: "4",
    //   name: "At Price",
    //   value:
    //     userDetail && userDetail.length > 0
    //       ? parseFloat(formatEther(userDetail[4])).toFixed(4)
    //       : 0,
    // },
    {
      id: "5",
      name: "Referred Users",
      value: userDetail && userDetail.length > 0 ? Number(userDetail[5]) : 0,
    },
    // {
    //   id: "6",
    //   name: "Total income",
    //   value:
    //     userDetail && userDetail.length > 0
    //       ? parseFloat(formatEther(userDetail[6])).toFixed(4)
    //       : 0,
    // },
    // {
    //   id: "7",
    //   name: "Root Balance",
    //   value:
    //     userDetail && userDetail.length > 0
    //       ? parseFloat(formatEther(userDetail[7])).toFixed(4)
    //       : 0,
    // },
    // {
    //   id: "8",
    //   name: "Assured Reward",
    //   value:
    //     userDetail && userDetail.length > 0
    //       ? parseFloat(formatEther(userDetail[8])).toFixed(4)
    //       : 0,
    // },
    // {
    //   id: "9",
    //   name: "Level Income Recived",
    //   value:
    //     userDetail && userDetail.length > 0
    //       ? parseFloat(formatEther(userDetail[9])).toFixed(4)
    //       : 0,
    // },
    // {
    //   id: "10",
    //   name: "Taken ROI",
    //   value:
    //     userDetail && userDetail.length > 0
    //       ? parseFloat(formatEther(userDetail[10])).toFixed(4)
    //       : 0,
    // },
    {
      id: "11",
      name: "Stake Times",
      value:
        userDetail && userDetail.length > 0
          ? dayjs(Number(userDetail[11]) * 1000).format("DD-MMM-YYYY")
          : "00-Month-0000",
    },
    {
      id: "12",
      name: "Income Missed",
      value:
        userDetail && userDetail.length > 0
          ? parseFloat(formatEther(userDetail[12])).toFixed(4)
          : 0,
    },
    {
      id: "13",
      name: "Top Up Time",
      value:
        dayjs(Number(TopUpTime.data) * 1000).format("DD-MMM-YYYY") ||
        "00-Month-0000",
    },
    {
      id: "14",
      name: "Reg Time",
      value:
        dayjs(Number(RegTime.data) * 1000).format("DD-MMM-YYYY") ||
        "00-Month-0000",
    },
    {
      id: 15,
      name: "Total Taken",
      value: TotalTaken.data
        ? parseFloat(formatEther(TotalTaken.data)).toFixed(4)
        : 0,
    },
    {
      id: 16,
      name: "Total Deposit",
      value: TotalDeposit.data
        ? parseFloat(formatEther(TotalDeposit.data)).toFixed(4)
        : 0, //parseFloat(formatEther(userDetail[14]))
    },
    {
      id: 17,
      name: "Last TopUp",
      value: lastToUpVal,
    },
    {
      id: 18,
      name: "Staked USDT",
      value: stakedUSDTVal,
    },
    {
      id: 19,
      name: "Total Income Limit",
      value: TotalDeposit.data
        ? (parseFloat(formatEther(TotalDeposit.data)) * 3).toFixed(4)
        : 0,
    },
    {
      id: 20,
      name: "Remaining Income Limit",
      value:
        TotalTaken.data && TotalDeposit.data
          ? (
              (parseFloat(formatEther(TotalDeposit.data)) * 3).toFixed(4) -
              parseFloat(formatEther(TotalTaken.data)).toFixed(4)
            ).toFixed(4)
          : 0,
    },
    {
      id: 21,
      name: "Remaining Withdrawal Amount",
      value: balanceIncome,
    },
  ];
  let currentRo = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "currRound",
    config,
  });
  useEffect(() => {
    let currentRtest = currentRo ? currentRo.data : 0;
    setCurrentR(Number(currentRtest));
  }, [currentRo.data]);
  const updateDateTopUp = (event: searchVAl) => {
    setCurrentR1(Number(event.currRound));
  };
  let definedRound = (currentR1 ? currentR1 : 0) > 0 ? currentR1 : currentR;

  const reportUsdtRes = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "reportsUSDT",
    args: [definedRound],
    config,
  });

  let usdtDetail: bigint[] = [];
  // console.log("Is it Fetching User Detai OF.. l******: ", userDetail);

  usdtDetail = reportUsdtRes?.data as bigint[];
  // console.log("Is it Fetching User Detail******: ", userDetail);

  const networkInto = [
    {
      id: "1",
      name: "Forwarded",
      value: usdtDetail ? parseFloat(formatEther(usdtDetail[8])).toFixed(4) : 0,
    },
    {
      id: "2",
      name: "Fresh TO",
      value: usdtDetail
        ? ((parseFloat(formatEther(usdtDetail[11])) * 3) / 100).toFixed(4)
        : 0,
    },
    {
      id: "3",
      name: "Top 4 Pool",
      value: usdtDetail ? parseFloat(formatEther(usdtDetail[9])).toFixed(4) : 0,
    },
    {
      id: "4",
      name: "To Distribute",
      value: usdtDetail
        ? parseFloat(formatEther(usdtDetail[10])).toFixed(4)
        : 0,
    },
  ];

  console.log("User Detail To fetch Pool......: ", usdtDetail);
  const winerInfo = [
    {
      id: "1",
      name: "First",
      address: usdtDetail
        ? usdtDetail[4]
        : "0x0000000000000000000000000000000000000000",
      value: usdtDetail ? parseFloat(formatEther(usdtDetail[0])).toFixed(4) : 0,
    },
    {
      id: "2",
      name: "Second",
      address: usdtDetail
        ? usdtDetail[5]
        : "0x0000000000000000000000000000000000000000",
      value: usdtDetail ? parseFloat(formatEther(usdtDetail[1])).toFixed(4) : 0,
    },
    {
      id: "3",
      name: "Third",
      address: usdtDetail
        ? usdtDetail[6]
        : "0x0000000000000000000000000000000000000000",
      value: usdtDetail ? parseFloat(formatEther(usdtDetail[2])).toFixed(4) : 0,
    },
    {
      id: "4",
      name: "Fourth",
      address: usdtDetail
        ? usdtDetail[7]
        : "0x0000000000000000000000000000000000000000",
      value: usdtDetail ? parseFloat(formatEther(usdtDetail[3])).toFixed(4) : 0,
    },
  ];

  type searchVAl = {
    currRound: number;
  };

  const levelsIncomeRes = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "levelsIncome",
    args: [address],
    config,
  });

  let levelsIncomeDetails: bigint[] = [];
  levelsIncomeDetails = levelsIncomeRes?.data as bigint[];

  const levelsRes = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "levels",
    args: [address],
    config,
  });

  let levelsDetails: bigint[] = [];
  levelsDetails = levelsRes?.data as bigint[];

  const level1Value = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "income",
    args: [address],
    config,
  });
  const directROIIncome = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "directROIIncome",
    args: [address],
    config,
  });
  console.log("Referred User: ", refferedUser);
  let level1Income: bigint[] = [];
  level1Income = level1Value?.data as bigint[];
  console.log("User Detail: ", userDetail);
  const levelDetailsData = [
    {
      id: 1,
      level: "Level Number",
      team: "Team",
      income: "Income",
    },
    {
      id: 16,
      level: "Level 1",
      team: refferedUser ? Number(refferedUser) : 0,
      income:
        directROIIncome.data && directROIIncome.data > 0 + " USDT"
          ? parseFloat(formatEther(directROIIncome.data.toString())).toFixed(4)
          : 0 + " USDT",
      // level1Income &&
      // parseFloat(formatEther(level1Income[0].toString())).toFixed(4)
      //   ? level1Income &&
      //     parseFloat(formatEther(level1Income[0].toString())).toFixed(4)
      //   : 0 + " USDT",
    },
    {
      id: 2,
      level: "Level 2",
      team:
        levelsDetails && levelsDetails[0].toString()
          ? levelsDetails[0].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[0] > 0
          ? parseFloat(formatEther(levelsIncomeDetails[0].toString())) + " USDT"
          : 0 + " USDT",
    },
    {
      id: 3,
      level: "Level 3",
      team:
        levelsDetails && levelsDetails[1].toString()
          ? levelsDetails[1].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[1] > 0
          ? parseFloat(formatEther(levelsIncomeDetails[1].toString())) + " USDT"
          : 0 + " USDT",
    },
    {
      id: 4,
      level: "Level 4",
      team:
        levelsDetails && levelsDetails[2].toString()
          ? levelsDetails[2].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[2].toString()
          ? parseFloat(formatEther(levelsIncomeDetails[2].toString())) + " USDT"
          : 0 + " USDT",
    },
    {
      id: 5,
      level: "Level 5",
      team:
        levelsDetails && levelsDetails[3].toString()
          ? levelsDetails[3].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[3].toString()
          ? parseFloat(formatEther(levelsIncomeDetails[3].toString())) + " USDT"
          : 0 + " USDT",
    },
    {
      id: 6,
      level: "Level 6",
      team:
        levelsDetails && levelsDetails[4].toString()
          ? levelsDetails[4].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[4].toString()
          ? parseFloat(formatEther(levelsIncomeDetails[4].toString())) + " USDT"
          : 0 + " USDT",
    },
    {
      id: 7,
      level: "Level 7",
      team:
        levelsDetails && levelsDetails[5].toString()
          ? levelsDetails[5].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[5].toString()
          ? parseFloat(formatEther(levelsIncomeDetails[5].toString())) + " USDT"
          : 0 + " USDT",
    },
    {
      id: 8,
      level: "Level 8",
      team:
        levelsDetails && levelsDetails[6].toString()
          ? levelsDetails[6].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[6].toString()
          ? parseFloat(formatEther(levelsIncomeDetails[6].toString())) + " USDT"
          : 0 + " USDT",
    },
    {
      id: 9,
      level: "Level 9",
      team:
        levelsDetails && levelsDetails[7].toString()
          ? levelsDetails[7].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[7].toString()
          ? parseFloat(formatEther(levelsIncomeDetails[7].toString())) + " USDT"
          : 0 + " USDT",
    },
    {
      id: 10,
      level: "Level 10",
      team:
        levelsDetails && levelsDetails[8].toString()
          ? levelsDetails[8].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[8].toString()
          ? parseFloat(formatEther(levelsIncomeDetails[8].toString())) + " USDT"
          : 0 + " USDT",
    },
    {
      id: 11,
      level: "Level 11",
      team:
        levelsDetails && levelsDetails[9].toString()
          ? levelsDetails[9].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[9].toString()
          ? parseFloat(formatEther(levelsIncomeDetails[9].toString())) + " USDT"
          : 0 + " USDT",
    },
    {
      id: 12,
      level: "Level 12",
      team:
        levelsDetails && levelsDetails[10].toString()
          ? levelsDetails[10].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[10].toString()
          ? parseFloat(formatEther(levelsIncomeDetails[10].toString())) +
            " USDT"
          : 0 + " USDT",
    },
    {
      id: 13,
      level: "Level 13",
      team:
        levelsDetails && levelsDetails[11].toString()
          ? levelsDetails[11].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[11].toString()
          ? parseFloat(formatEther(levelsIncomeDetails[11].toString())) +
            " USDT"
          : 0 + " USDT",
    },
    {
      id: 14,
      level: "Level 14",
      team:
        levelsDetails && levelsDetails[12].toString()
          ? levelsDetails[12].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[12].toString()
          ? parseFloat(formatEther(levelsIncomeDetails[12].toString())) +
            " USDT"
          : 0 + " USDT",
    },
    {
      id: 15,
      level: "Level 15",
      team:
        levelsDetails && levelsDetails[13].toString()
          ? levelsDetails[13].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[13].toString()
          ? parseFloat(formatEther(levelsIncomeDetails[13].toString())) +
            " USDT"
          : 0 + " USDT",
    },
  ];

  const userTeamSize = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "userTeamSize",
    args: [address],
    config,
  });
  let userTeamSizeRes: bigint[] = [];
  userTeamSizeRes = userTeamSize?.data as bigint[];
  const userTurnOver = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "userTurnOver",
    args: [address],
    config,
  });
  useEffect(() => {
    setUserTurnOverRes(userTurnOver.data ? userTurnOver.data : 0);
  }, [userTurnOver.data ? userTurnOver.data : 0]);

  useEffect(() => {
    if (
      totalDepositRes >= 100 &&
      refferedUser >= 5 &&
      levelIncomeReceived >= 15 &&
      userTurnOverRes >= 3100
    ) {
      setRewardInfoRank(1);
    }
    if (
      totalDepositRes >= 300 &&
      refferedUser >= 7 &&
      levelIncomeReceived >= 30 &&
      userTurnOverRes >= 10300
    ) {
      setRewardInfoRank(2);
    }
    if (
      totalDepositRes >= 500 &&
      refferedUser >= 8 &&
      levelIncomeReceived >= 50 &&
      userTurnOverRes >= 30500
    ) {
      setRewardInfoRank(3);
    }
    if (
      totalDepositRes >= 1000 &&
      refferedUser >= 10 &&
      levelIncomeReceived >= 100 &&
      userTurnOverRes >= 101000
    ) {
      setRewardInfoRank(4);
    }
    if (
      totalDepositRes >= 5000 &&
      refferedUser >= 12 &&
      levelIncomeReceived >= 200 &&
      userTurnOverRes >= 1000000
    ) {
      setRewardInfoRank(5);
    }
    if (
      totalDepositRes >= 10000 &&
      refferedUser >= 14 &&
      levelIncomeReceived >= 500 &&
      userTurnOverRes >= 5000000
    ) {
      setRewardInfoRank(6);
    }
    if (
      totalDepositRes >= 25000 &&
      refferedUser >= 15 &&
      levelIncomeReceived >= 1000 &&
      userTurnOverRes >= 20000000
    ) {
      setRewardInfoRank(7);
    }
  }, []);

  const kbcrewardInfo = [
    {
      id: "1",
      name: "Team Size",
      value: userTeamSizeRes ? userTeamSizeRes : 0,
    },
    {
      id: "2",
      name: "Trun Over",
      value: userTurnOverRes
        ? parseFloat(formatEther(userTurnOverRes.toString())).toFixed(4)
        : 0,
    },
    {
      id: "3",
      name: "Rank",
      value: rewardInfoRank ? rewardInfoRank : 0,
    },
    {
      id: "4",
      name: "Reffered User",
      value: refferedUser ? refferedUser : 0,
    },
  ];
  const RanksFun = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "ranks",
    args: [address], //[address],
    config,
  });

  let RanksFunRes: bigint[] = [];
  RanksFunRes = RanksFun?.data as bigint[];
  console.log("Ranks Of this: ", RanksFunRes);

  const Ranks_val = [
    {
      id: 1,
      level: "Stars Number",
      team: "Dr Achiever",
      income: "Paid",
    },
    {
      id: 2,
      level: "Star One",
      team:
        RanksFunRes && RanksFunRes[0].toString()
          ? RanksFunRes[0].toString()
          : 0,
      income: RanksFunRes && RanksFunRes[7] ? "Yes" : "No",
    },
    {
      id: 3,
      level: "Star Two",
      team:
        RanksFunRes && RanksFunRes[1].toString()
          ? RanksFunRes[1].toString()
          : 0,
      income: RanksFunRes && RanksFunRes[8] ? "Yes" : "No",
    },
    {
      id: 4,
      level: "Star Three",
      team:
        RanksFunRes && RanksFunRes[2].toString()
          ? RanksFunRes[2].toString()
          : 0,
      income: RanksFunRes && RanksFunRes[9] ? "Yes" : "No",
    },
    {
      id: 5,
      level: "Star Four",
      team:
        RanksFunRes && RanksFunRes[3].toString()
          ? RanksFunRes[3].toString()
          : 0,
      income: RanksFunRes && RanksFunRes[10] ? "Yes" : "No",
    },
    {
      id: 6,
      level: "Star Five",
      team:
        RanksFunRes && RanksFunRes[4].toString()
          ? RanksFunRes[4].toString()
          : 0,
      income: RanksFunRes && RanksFunRes[11] ? "Yes" : "No",
    },
    {
      id: 7,
      level: "Star Six",
      team:
        RanksFunRes && RanksFunRes[5].toString()
          ? RanksFunRes[5].toString()
          : 0,
      income: RanksFunRes && RanksFunRes[12] ? "Yes" : "No",
    },
    {
      id: 8,
      level: "Star Seven",
      team:
        RanksFunRes && RanksFunRes[6].toString()
          ? RanksFunRes[6].toString()
          : 0,
      income: RanksFunRes && RanksFunRes[13] ? "Yes" : "No",
    },
  ];

  return (
    <>
      <div className="row px-5">
        {/* User Info  */}
        <div className="col-lg-6">
          <div className="d-flex justify-content-center mt-4">
            <div className="network-heading text-center rounded-top-2">
              KBC User info
            </div>
          </div>
          <div className="user-box">
            {userDetail_arr.map((e) => (
              <div key={e.id} className="user-item">
                <div className="col-6 user-title">{e.name}:</div>
                <div className="col-6 user-value">{e.value}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Network Info  */}
        <div className="col-lg-6">
          <div className="d-flex justify-content-center mt-4">
            <div className="network-heading text-center rounded-top-2">
              Top 4 Pool Info
            </div>
          </div>
          <div className="network-box">
            <div className="row">
              {networkInto.map((element) => (
                <div
                  key={element.id}
                  className="col-lg-3 col-md-6 col-sm-6 col-6 network-item"
                >
                  <p className="network-number m-0 p-0">
                    {element.value}
                    <span className="sub-title">USDT</span>
                  </p>
                  <p className="network-title m-0 p-0"> {element.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="reward-box">
            <div className="d-flex justify-content-center">
              <span className="text-pink fs-3">Today winner </span>
              <span id="countDownTodayWinner" className="text-pink fs-3">
                <CountdownTimer targetTime={formattedRound} />
              </span>
            </div>
            {winerInfo.map((ele) => (
              <div key={ele.id} className="text-center mt-2">
                <p className="m-0 text-pink fs-3">{ele.name}</p>
                <p className="m-0">{ele.address.toString()}</p>
                <p className="m-0">
                  Trunover :<span className="fw-bold">{ele.value}</span> USDT
                </p>
                <div className="d-flex justify-content-center">
                  <div className="bar"></div>
                </div>
              </div>
            ))}

            <div className="swap mt-20">
              <div className="swap-box">
                <Form
                  name="updateTopup"
                  onFinish={updateDateTopUp}
                  autoComplete="off"
                >
                  <div className="d-flex justify-content-center align-item-center">
                    <Form.Item
                      name="currRound"
                      rules={[
                        {
                          required: true,
                          message: "Please enter current round !",
                        },
                      ]}
                      className="node-title mt-4"
                    >
                      <Input
                        className="input_filed"
                        placeholder="Round Number ..."
                      />
                    </Form.Item>
                    <Button className="submit-btn ml-15 h-60" htmlType="submit">
                      Search
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
        {/* KBC User Level info */}
        <div className="col-lg-6">
          <div className="d-flex justify-content-center mt-4">
            <div className="network-heading text-center rounded-top-2">
              Level ROI Info
            </div>
          </div>
          <div className="user-box1">
            {levelDetailsData.map(({ id, level, team, income }) => (
              <div key={id} className="user-item">
                <div className="col-6 user-title">{level}:</div>
                <div className="col-3 user-value">{team}</div>
                <div className="col-3 user-value">{income}</div>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="row px-5"> */}
        <div className="col-lg-6">
          <div className="d-flex justify-content-center mt-4">
            <div className="network-heading text-center rounded-top-2">
              SAR Rank Info
            </div>
          </div>
          <div className="network-box">
            <div className="row">
              {kbcrewardInfo.map((element) => (
                <div
                  key={element.id}
                  className="col-lg-3 col-md-6 col-sm-6 col-6 network-item"
                >
                  <p className="network-number m-0 p-0">
                    {element.value.toString()}
                  </p>
                  <p className="network-title m-0 p-0"> {element.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rank-box mt-3">
            <div className="d-flex justify-content-center mb-3">
              <span className="text-pink fs-3">Rank </span>
            </div>
            {Ranks_val.map(({ id, level, team, income }) => (
              <div key={id} className="user-item">
                <div className="col-6 user-title">{level}:</div>
                <div className="col-3 user-value">{team}</div>
                <div className="col-3 user-value">{income}</div>
              </div>
            ))}
            {/* </div> */}
          </div>
          <div className="d-flex justify-content-center mt-4">
            <a
              href="https://testnet-scan.kbcfoundation.com/address/0x46D44aFCc97462d9AE0320C9DA6d891c10D71e39?tab=read_contract"
              target="_blank"
              rel="noopener noreferrer"
              className="contract-link"
            >
              Contract Address: 0x46D44aFCc97462d9AE0320C9DA6d891c10D71e39
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserInfo;
