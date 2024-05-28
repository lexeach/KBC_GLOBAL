import { useAccount, useReadContract } from "wagmi";
import { Button, Form, Input } from "antd";
import { formatEther } from "ethers/utils";
import dayjs from "dayjs";

import { contract_address, contract_abi } from "../contract";
import { config } from "../config";
import { useEffect, useState } from "react";
import CountdownTimer from "./CountdownTimer";

const UserInfo = () => {
  const { address } = useAccount();
  const [currentR, setCurrentR] = useState(0);
  const [currentR1, setCurrentR1] = useState(0);
  const [rewardInfoRank, setRewardInfoRank] = useState(0);
  // const [userId, setUserId] = useState(0);

  const userData = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "users",
    args: [address],
    config,
  });
  let userDetail: bigint[] = [];
  useEffect(() => {
    userDetail = userData?.data as bigint[];
  }, [userData.data ? userData.data[5] : 0]);

  const userId = userDetail ? userDetail[1] : 0;
  const refferedUser = userDetail ? userDetail[5] : 0;

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
  console.log("User Detail: ", userDetail, userDetail.length);
  const userDetail_arr = [
    {
      id: "1",
      name: "User ID",
      value: userId,
    },
    {
      id: "2",
      name: "Referrer ID",
      value: userDetail && userDetail.length > 0 ? Number(userDetail[2]) : 0,
    },
    {
      id: "3",
      name: "Staked KBC",
      value:
        userDetail && userDetail.length > 0
          ? parseFloat(formatEther(userDetail[3])).toFixed(4)
          : 0,
    },
    {
      id: "4",
      name: "At Price",
      value:
        userDetail && userDetail.length > 0
          ? parseFloat(formatEther(userDetail[4])).toFixed(4)
          : 0,
    },
    {
      id: "5",
      name: "Referred Users",
      value: userDetail && userDetail.length > 0 ? Number(userDetail[5]) : 0,
    },
    {
      id: "6",
      name: "Total income",
      value:
        userDetail && userDetail.length > 0
          ? parseFloat(formatEther(userDetail[6])).toFixed(4)
          : 0,
    },
    {
      id: "7",
      name: "Root Balance",
      value:
        userDetail && userDetail.length > 0
          ? parseFloat(formatEther(userDetail[7])).toFixed(4)
          : 0,
    },
    {
      id: "8",
      name: "Assured Reward",
      value:
        userDetail && userDetail.length > 0
          ? parseFloat(formatEther(userDetail[8])).toFixed(4)
          : 0,
    },
    {
      id: "9",
      name: "Level Income Recived",
      value:
        userDetail && userDetail.length > 0
          ? parseFloat(formatEther(userDetail[9])).toFixed(4)
          : 0,
    },
    {
      id: "10",
      name: "Taken ROI",
      value:
        userDetail && userDetail.length > 0
          ? parseFloat(formatEther(userDetail[10])).toFixed(4)
          : 0,
    },
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
      value: TotalTaken.data ? formatEther(TotalTaken.data) : 0,
    },
    {
      id: 16,
      name: "Total Deposit",
      value: TotalDeposit.data ? formatEther(TotalDeposit.data) : 0, //parseFloat(formatEther(userDetail[14]))
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
    // setCurrentRound(event.currRound);
    // console.log("Round Setting Performing: ", typeof event.currRound);
    setCurrentR1(Number(event.currRound));
  };
  // console.log("Current Round is here************: ", currentR);

  // console.log("Current Round is:  ", currentR);
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
      name: "Actual",
      value: usdtDetail
        ? parseFloat(formatEther(usdtDetail[11])).toFixed(4)
        : 0,
    },
    {
      id: "3",
      name: "USDT",
      value: usdtDetail ? parseFloat(formatEther(usdtDetail[9])).toFixed(4) : 0,
    },
    {
      id: "4",
      name: "Distribute",
      value: usdtDetail
        ? parseFloat(formatEther(usdtDetail[10])).toFixed(4)
        : 0,
    },
  ];

  console.log("User Detail To fetch Pool......: ", usdtDetail);
  const winerInfo = [
    {
      id: "1",
      name: "Top 4 Pool Forwarded",
      address: usdtDetail
        ? usdtDetail[4]
        : "0x0000000000000000000000000000000000000000",
      value: usdtDetail ? parseFloat(formatEther(usdtDetail[0])).toFixed(4) : 0,
    },
    {
      id: "2",
      name: "Fresh To",
      address: usdtDetail
        ? usdtDetail[5]
        : "0x0000000000000000000000000000000000000000",
      value: usdtDetail ? parseFloat(formatEther(usdtDetail[1])).toFixed(4) : 0,
    },
    {
      id: "3",
      name: "Top 4 Pool",
      address: usdtDetail
        ? usdtDetail[6]
        : "0x0000000000000000000000000000000000000000",
      value: usdtDetail ? parseFloat(formatEther(usdtDetail[2])).toFixed(4) : 0,
    },
    {
      id: "4",
      name: "Top 4 Pool2 Distribute",
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

  let level1Income: bigint[] = [];
  level1Income = level1Value?.data as bigint[];

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
      team: userDetail ? Number(userDetail[5]) : 0,
      income:
        level1Income &&
        parseFloat(formatEther(level1Income[0].toString())).toFixed(4)
          ? level1Income &&
            parseFloat(formatEther(level1Income[0].toString())).toFixed(4)
          : 0 + " USDT",
    },
    {
      id: 2,
      level: "Level 2",
      team:
        levelsDetails && levelsDetails[0].toString()
          ? levelsDetails && levelsDetails[0].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[0].toString()
          ? levelsIncomeDetails && levelsIncomeDetails[0].toString()
          : 0 + " USDT",
    },
    {
      id: 3,
      level: "Level 3",
      team:
        levelsDetails && levelsDetails[1].toString()
          ? levelsDetails && levelsDetails[1].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[1].toString()
          ? levelsIncomeDetails && levelsIncomeDetails[1].toString()
          : 0 + " USDT",
    },
    {
      id: 4,
      level: "Level 4",
      team:
        levelsDetails && levelsDetails[2].toString()
          ? levelsDetails && levelsDetails[2].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[2].toString()
          ? levelsIncomeDetails && levelsIncomeDetails[2].toString()
          : 0 + " USDT",
    },
    {
      id: 5,
      level: "Level 5",
      team:
        levelsDetails && levelsDetails[3].toString()
          ? levelsDetails && levelsDetails[3].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[3].toString()
          ? levelsIncomeDetails && levelsIncomeDetails[3].toString()
          : 0 + " USDT",
    },
    {
      id: 6,
      level: "Level 6",
      team:
        levelsDetails && levelsDetails[4].toString()
          ? levelsDetails && levelsDetails[4].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[4].toString()
          ? levelsIncomeDetails && levelsIncomeDetails[4].toString()
          : 0 + " USDT",
    },
    {
      id: 7,
      level: "Level 7",
      team:
        levelsDetails && levelsDetails[5].toString()
          ? levelsDetails && levelsDetails[5].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[5].toString()
          ? levelsIncomeDetails && levelsIncomeDetails[5].toString()
          : 0 + " USDT",
    },
    {
      id: 8,
      level: "Level 8",
      team:
        levelsDetails && levelsDetails[6].toString()
          ? levelsDetails && levelsDetails[6].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[6].toString()
          ? levelsIncomeDetails && levelsIncomeDetails[6].toString()
          : 0 + " USDT",
    },
    {
      id: 9,
      level: "Level 9",
      team:
        levelsDetails && levelsDetails[7].toString()
          ? levelsDetails && levelsDetails[7].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[7].toString()
          ? levelsIncomeDetails && levelsIncomeDetails[7].toString()
          : 0 + " USDT",
    },
    {
      id: 10,
      level: "Level 10",
      team:
        levelsDetails && levelsDetails[8].toString()
          ? levelsDetails && levelsDetails[8].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[8].toString()
          ? levelsIncomeDetails && levelsIncomeDetails[8].toString()
          : 0 + " USDT",
    },
    {
      id: 11,
      level: "Level 11",
      team:
        levelsDetails && levelsDetails[9].toString()
          ? levelsDetails && levelsDetails[9].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[9].toString()
          ? levelsIncomeDetails && levelsIncomeDetails[9].toString()
          : 0 + " USDT",
    },
    {
      id: 12,
      level: "Level 12",
      team:
        levelsDetails && levelsDetails[10].toString()
          ? levelsDetails && levelsDetails[10].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[10].toString()
          ? levelsIncomeDetails && levelsIncomeDetails[10].toString()
          : 0 + " USDT",
    },
    {
      id: 13,
      level: "Level 13",
      team:
        levelsDetails && levelsDetails[11].toString()
          ? levelsDetails && levelsDetails[11].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[11].toString()
          ? levelsIncomeDetails && levelsIncomeDetails[11].toString()
          : 0 + " USDT",
    },
    {
      id: 14,
      level: "Level 14",
      team:
        levelsDetails && levelsDetails[12].toString()
          ? levelsDetails && levelsDetails[12].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[12].toString()
          ? levelsIncomeDetails && levelsIncomeDetails[12].toString()
          : 0 + " USDT",
    },
    {
      id: 15,
      level: "Level 15",
      team:
        levelsDetails && levelsDetails[13].toString()
          ? levelsDetails && levelsDetails[13].toString()
          : 0,
      income:
        levelsIncomeDetails && levelsIncomeDetails[13].toString()
          ? levelsIncomeDetails && levelsIncomeDetails[13].toString()
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

  let userTurnOverRes: bigint[] = [];
  userTurnOverRes = userTurnOver?.data as bigint[];

  // const usersCT = useReadContract({
  //   abi: contract_abi,
  //   address: contract_address,
  //   functionName: "users",
  //   args: [address],
  //   config,
  // });
  // let assingUserId = usersCT.data ? usersCT.data[1] : 0;
  // useEffect(() => {
  //   setUserId(assingUserId);
  // }, [assingUserId]);

  // const [rewardInfoRank, setRewardInfoRank] = useState(0)
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
      value: rewardInfoRank
        ? parseFloat(formatEther(rewardInfoRank).toString()).toFixed(4)
        : 0,
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
    args: [address],
    config,
  });

  let RanksFunRes: bigint[] = [];
  RanksFunRes = RanksFun?.data as bigint[];
  const Ranks_val = [
    {
      id: 1,
      level: "Stars Number",
      team: "Value",
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
              KBC Network info
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
              KBC User Level info
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
              KBC reward info
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
              href="https://testnet-scan.kbcfoundation.com/address/0x92D4B1B7D3f86709FD69650398fe67387387Ff96?tab=read_contract"
              target="_blank"
              rel="noopener noreferrer"
              className="contract-link"
            >
              Contract Address: 0x92D4B1B7D3f86709FD69650398fe67387387Ff96
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserInfo;
