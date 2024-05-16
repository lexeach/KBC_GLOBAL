import { useAccount, useReadContract } from "wagmi";
import { Button, Form, Input } from "antd";
import { formatEther } from "ethers/utils";
import dayjs from "dayjs";

import {
  contract_address,
  contract_abi
} from "../contract";
import { config } from "../config";
import { useState } from "react";

const UserInfo = () => {
  const { address } = useAccount();
  const [currentRound, setCurrentRound] = useState(1);

  const userData = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "users",
    args: [address],
    config,
  });

  let userDetail: bigint[] = [];
  userDetail = userData?.data as bigint[];

  const userId = userDetail ? userDetail[1] : 0;

  // function 22
  const TopUpTime = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "topUpTime",
    args: [address],
    config,
  });

  // function 16
  const RegTime = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "regTime",
    args: [address],
    config,
  });

  const userDetail_arr = [
    {
      id: "1",
      name: "User ID",
      value: userId,
    },
    {
      id: "2",
      name: "Referrer ID",
      value: userDetail ? Number(userDetail[2]) : 0,
    },
    {
      id: "3",
      name: "Staked KBC",
      value: userDetail ? formatEther(userDetail[3]) : 0,
    },
    {
      id: "4",
      name: "At Price",
      value: userDetail ? formatEther(userDetail[4]) : 0,
    },
    {
      id: "5",
      name: "Referred Users",
      value: userDetail ? Number(userDetail[5]) : 0,
    },
    {
      id: "6",
      name: "Total income",
      value: userDetail ? formatEther(userDetail[6]) : 0,
    },
    {
      id: "7",
      name: "Root Balance",
      value: userDetail ? formatEther(userDetail[7]) : 0,
    },
    {
      id: "8",
      name: "Assured Reward",
      value: userDetail ? formatEther(userDetail[8]) : 0,
    },
    {
      id: "9",
      name: "Level Income Recived",
      value: userDetail ? formatEther(userDetail[9]) : 0,
    },
    {
      id: "10",
      name: "Token ROI",
      value: userDetail ? formatEther(userDetail[10]) : 0,
    },
    {
      id: "11",
      name: "Stake Times",
      value: userDetail
        ? dayjs(Number(userDetail[11]) * 1000).format("DD-MMM-YYYY")
        : "00-Month-0000",
    },
    {
      id: "12",
      name: "Income Missed",
      value: userDetail ? formatEther(userDetail[12]) : 0,
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
    // {
    //   id: 12,
    //   name: "Register time",
    //   value: userDetail ? formatEther(userDetail[13]) : 0,
    // },
    // {
    //   id: 12,
    //   name: "Mint Day",
    //   value: userDetail ? formatEther(userDetail[14]) : 0,
    // },
  ];

  const reportUsdtRes = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "reportsUSDT",
    args: [currentRound],
    config,
  });

  let usdtDetail: bigint[] = [];
  usdtDetail = reportUsdtRes?.data as bigint[];

  const networkInto = [
    {
      id: "1",
      name: "Forwarded",
      value: usdtDetail ? formatEther(usdtDetail[8]) : 0,
    },
    {
      id: "2",
      name: "Actual",
      value: usdtDetail ? formatEther(usdtDetail[11]) : 0,
    },
    {
      id: "3",
      name: "USDT",
      value: usdtDetail ? formatEther(usdtDetail[9]) : 0,
    },
    {
      id: "4",
      name: "Distribute",
      value: usdtDetail ? formatEther(usdtDetail[10]) : 0,
    },
  ];

  const winerInfo = [
    {
      id: "1",
      name: "Top 4 Pool Forwarded",
      address: usdtDetail
        ? usdtDetail[4]
        : "0x0000000000000000000000000000000000000000",
      value: usdtDetail ? formatEther(usdtDetail[0]) : 0,
    },
    {
      id: "2",
      name: "Fresh To",
      address: usdtDetail
        ? usdtDetail[5]
        : "0x0000000000000000000000000000000000000000",
      value: usdtDetail ? formatEther(usdtDetail[1]) : 0,
    },
    {
      id: "3",
      name: "Top 4 Pool",
      address: usdtDetail
        ? usdtDetail[6]
        : "0x0000000000000000000000000000000000000000",
      value: usdtDetail ? formatEther(usdtDetail[2]) : 0,
    },
    {
      id: "4",
      name: "Top 4 Pool2 Distribute",
      address: usdtDetail
        ? usdtDetail[7]
        : "0x0000000000000000000000000000000000000000",
      value: usdtDetail ? formatEther(usdtDetail[3]) : 0,
    },
  ];

  type searchVAl = {
    currRound: number;
  };

  const updateDateTopUp = (event: searchVAl) =>
    setCurrentRound(event.currRound);

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
      income: level1Income && formatEther(level1Income[0].toString()) + " USDT",
    },
    {
      id: 2,
      level: "Level 2",
      team: levelsDetails && levelsDetails[0].toString(),
      income:
        levelsIncomeDetails && levelsIncomeDetails[0].toString() + " USDT",
    },
    {
      id: 3,
      level: "Level 3",
      team: levelsDetails && levelsDetails[1].toString(),
      income:
        levelsIncomeDetails && levelsIncomeDetails[1].toString() + " USDT",
    },
    {
      id: 4,
      level: "Level 4",
      team: levelsDetails && levelsDetails[2].toString(),
      income:
        levelsIncomeDetails && levelsIncomeDetails[2].toString() + " USDT",
    },
    {
      id: 5,
      level: "Level 5",
      team: levelsDetails && levelsDetails[3].toString(),
      income:
        levelsIncomeDetails && levelsIncomeDetails[3].toString() + " USDT",
    },
    {
      id: 6,
      level: "Level 6",
      team: levelsDetails && levelsDetails[4].toString(),
      income:
        levelsIncomeDetails && levelsIncomeDetails[4].toString() + " USDT",
    },
    {
      id: 7,
      level: "Level 7",
      team: levelsDetails && levelsDetails[5].toString(),
      income:
        levelsIncomeDetails && levelsIncomeDetails[5].toString() + " USDT",
    },
    {
      id: 8,
      level: "Level 8",
      team: levelsDetails && levelsDetails[6].toString(),
      income:
        levelsIncomeDetails && levelsIncomeDetails[6].toString() + " USDT",
    },
    {
      id: 9,
      level: "Level 9",
      team: levelsDetails && levelsDetails[7].toString(),
      income:
        levelsIncomeDetails && levelsIncomeDetails[7].toString() + " USDT",
    },
    {
      id: 10,
      level: "Level 10",
      team: levelsDetails && levelsDetails[8].toString(),
      income:
        levelsIncomeDetails && levelsIncomeDetails[8].toString() + " USDT",
    },
    {
      id: 11,
      level: "Level 11",
      team: levelsDetails && levelsDetails[9].toString(),
      income:
        levelsIncomeDetails && levelsIncomeDetails[9].toString() + " USDT",
    },
    {
      id: 12,
      level: "Level 12",
      team: levelsDetails && levelsDetails[10].toString(),
      income:
        levelsIncomeDetails && levelsIncomeDetails[10].toString() + " USDT",
    },
    {
      id: 13,
      level: "Level 13",
      team: levelsDetails && levelsDetails[11].toString(),
      income:
        levelsIncomeDetails && levelsIncomeDetails[11].toString() + " USDT",
    },
    {
      id: 14,
      level: "Level 14",
      team: levelsDetails && levelsDetails[12].toString(),
      income:
        levelsIncomeDetails && levelsIncomeDetails[12].toString() + " USDT",
    },
    {
      id: 15,
      level: "Level 15",
      team: levelsDetails && levelsDetails[13].toString(),
      income:
        levelsIncomeDetails && levelsIncomeDetails[13].toString() + " USDT",
    },
  ];





  // set reward 

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
                <div className="col-6 user-value">{e.value.toString()}</div>
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
              <span className="text-pink fs-3">Today winner</span>
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
                      className="node-title"
                    >
                      <Input
                        className="input_filed"
                        placeholder="Round Number ..."
                      />
                    </Form.Item>
                    <Button className="submit-btn ml-15" htmlType="submit">
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
        {/* Top 4 Pool History  */}
        <div className="col-lg-6">
          <div className="d-flex justify-content-center mt-4">
            <div className="network-heading text-center rounded-top-2">
              Top 4 Pool History
            </div>
          </div>
          <div className="reward-box1">
            <div className="d-flex justify-content-center">
              <span className="text-pink fs-3">TOP 4 POOL History</span>
            </div>
            {winerInfo.map((ele) => (
              <div key={ele.id} className="text-center mt-2">
                <p className="m-0 text-pink fs-3">{ele.name}</p>
                <p className="m-0">
                  <span className="fw-bold">{ele.value}</span> USDT
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
                      className="node-title"
                    >
                      <Input
                        className="input_filed"
                        placeholder="Round Number ..."
                      />
                    </Form.Item>
                    <Button className="submit-btn ml-15" htmlType="submit">
                      Search
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserInfo;
