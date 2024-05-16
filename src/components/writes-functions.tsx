import { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useAccount, useReadContract } from "wagmi";
// import { ethers } from "ethers";
import { parseEther } from "ethers/utils";

import { simulateContract, writeContract } from "@wagmi/core";

import {
  contract_address,
  contract_abi,
  contract_abi_second,
  contract_address_second,
} from "../contract";
import { config } from "../config";

const WriteAbleFun = () => {
  const [rewardInfoRank, setRewardInfoRank] = useState(0);
  const { address } = useAccount();
  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  // register function start
  type RegistrationValues = {
    nodeQuantity: string;
    referralId: string;
  };

  const onFinishReg = async (values: RegistrationValues) => {
    console.log("values", values);

    const { request } = await simulateContract(config, {
      abi: contract_abi,
      address: contract_address,
      functionName: "Registration",
      args: [values.referralId],
      value: parseEther(values.nodeQuantity),
    });
    const hash = await writeContract(config, request);

    console.log("hash", hash);

  };

  // end register function

  // with drwal ROI function
  const withdrawROI = async () => {
    if (address) {
      try {
        // console.log("values", values);

        const { request } = await simulateContract(config, {
          abi: contract_abi,
          address: contract_address,
          functionName: "withdrawROI",
          // value: parseEther("0.001"),
        });
        const hash = await writeContract(config, request);

        console.log("hash", hash);
      } catch (error) {
        console.error("Error sending transaction to contract:", error);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  // with drwal-income function
  const withDrawalIncomeNow = async () => {
    if (address) {
      try {
        const { request } = await simulateContract(config, {
          abi: contract_abi,
          address: contract_address,
          functionName: "withdrawIncome",
          // args: [2],
          // value: parseEther("0.001"),
        });
        const hash = await writeContract(config, request);

        console.log("hash", hash);
        // const transaction = await contract.withdrawIncome();
      } catch (error) {
        console.error("Error sending transaction to contract:", error);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  // register function start
  type DepositKBCValues = {
    payableAmount: string;
  };
  // deposit KBC
  const onFinishDepositKBC = async (values: DepositKBCValues) => {
    if (address) {
      try {
        const { request } = await simulateContract(config, {
          abi: contract_abi,
          address: contract_address,
          functionName: "depositKBC",
          value: parseEther(values.payableAmount),
        });
        const hash = await writeContract(config, request);

        console.log("Transaction successful!", hash);
      } catch (error) {
        console.error("Error sending transaction to contract:", error);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  //   // end Deposit kbc function
  //   // fundGlobal

  type GlobalFund = {
    payableAmount: string;
  };

  // start fund Global function
  const onFinishfundGlobal = async (values: GlobalFund) => {
    if (address) {
      try {
        const { request } = await simulateContract(config, {
          abi: contract_abi,
          address: contract_address,
          functionName: "fundGlobalPool",
          value: parseEther(values.payableAmount),
        });

        const hash = await writeContract(config, request);

        console.log("Transaction successful!", hash);
      } catch (error) {
        console.error("Error sending transaction to contract:", error);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  //   // end fundGlobal function

  //   // InsurancePool payableAmount

  type InsurancePool = {
    payableAmount: string;
  };
  // start InsurancePool function
  const onFinishInsurancePool = async (values: InsurancePool) => {
    if (address) {
      try {
        const { request } = await simulateContract(config, {
          abi: contract_abi,
          address: contract_address,
          functionName: "fundInsurancePool",
          value: parseEther(values.payableAmount),
        });

        const hash = await writeContract(config, request);

        console.log("Transaction successful!", hash);
      } catch (error) {
        console.error("Error sending transaction to contract:", error);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };
 
  //   // endInsurancePool function
  // price
  type SetKBCPrice = {
    price: string;
  };
  // start SetKBCPrice function
  const onFinishSetKBCPrice = async (values: SetKBCPrice) => {
    if (address) {
      try {
        const { request } = await simulateContract(config, {
          abi: contract_abi,
          address: contract_address,
          functionName: "setKbcPrice",
          args: [values.price],
          // value: parseEther(values.payableAmount),
        });

        const hash = await writeContract(config, request);

        console.log("Transaction successful!", hash);

      } catch (error) {
        console.error("Error sending transaction to contract:", error);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  //   // end SetKBCPrice function

  type ITopUp = {
    payableamount: string;
    amount: string;
  };

  //start TopUp function
  const onFinishtopup = async (values: ITopUp) => {
    if (address) {
      try {
        const { request } = await simulateContract(config, {
          abi: contract_abi,
          address: contract_address,
          functionName: "topUp",
          args: [values.amount],
          value: parseEther(values.payableamount),
        });
        const hash = await writeContract(config, request);

        console.log("hash", hash);
      
      } catch (error) {
        console.error("Error sending transaction to contract:", error);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  //   // end TopUp function
  //   // withdralCoin
  type WithdralCoin = {
    toAddress: string;
    amount: string;
  };

  //start withdralCoin function
  const onFinishwithdralCoin = async (values: WithdralCoin) => {
    if (address) {
      try {
        const { request } = await simulateContract(config, {
          abi: contract_abi,
          address: contract_address,
          functionName: "withdrawalCoin",
          args: [values.toAddress, values.amount],
        });

        const hash = await writeContract(config, request);

        console.log("Transaction successful!", hash);
     
      } catch (error) {
        console.error("Error sending transaction to contract:", error);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  // read function start

  const usersCT = useReadContract({
    abi: contract_abi_second,
    address: contract_address_second,
    functionName: "users",
    args: [address],
    config,
  });

  console.log("usersCT >> ", usersCT);

  let usersCTRes: bigint[] = [];
  usersCTRes = usersCT?.data as bigint[];
  console.log("usersCTRes >>", usersCTRes);

  const userTeamSize = useReadContract({
    abi: contract_abi_second,
    address: contract_address_second,
    functionName: "userTeamSize",
    args: [address],
    config,
  });
  let userTeamSizeRes: bigint[] = [];
  userTeamSizeRes = userTeamSize?.data as bigint[];

  const userTurnOver = useReadContract({
    abi: contract_abi_second,
    address: contract_address_second,
    functionName: "userTurnOver",
    args: [address],
    config,
  });

  let userTurnOverRes: bigint[] = [];
  userTurnOverRes = userTurnOver?.data as bigint[];

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
      value: userTurnOverRes ? userTurnOverRes : 0,
    },
    {
      id: "3",
      name: "Rank",
      value: rewardInfoRank ? rewardInfoRank : 0,
    },
    {
      id: "4",
      name: "Reffered User",
      value: usersCTRes ? usersCTRes[2] : 0,
    },
  ];

  // ranks

  const RanksFun = useReadContract({
    abi: contract_abi_second,
    address: contract_address_second,
    functionName: "ranks",
    args: [address],
    config,
  });

  let RanksFunRes: bigint[] = [];
  RanksFunRes = RanksFun?.data as bigint[];
  console.log('RanksFunRes >>> ', RanksFunRes);
  


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
      team: RanksFunRes && RanksFunRes[0].toString(),
      income:
        RanksFunRes && RanksFunRes[7] ? 'Yes' : 'No',
    },
    {
      id: 3,
      level: "Star Two",
      team: RanksFunRes && RanksFunRes[1].toString(),
      income:
        RanksFunRes && RanksFunRes[8] ? 'Yes' : 'No',
    },
    {
      id: 4,
      level: "Star Three",
      team: RanksFunRes && RanksFunRes[2].toString(),
      income:
        RanksFunRes && RanksFunRes[9] ? 'Yes' : 'No',
    },
    {
      id: 5,
      level: "Star Four",
      team: RanksFunRes && RanksFunRes[3].toString(),
      income:
        RanksFunRes && RanksFunRes[10] ? 'Yes' : 'No',
    },
    {
      id: 6,
      level: "Star Five",
      team: RanksFunRes && RanksFunRes[4].toString(),
      income:
        RanksFunRes && RanksFunRes[11] ? 'Yes' : 'No',
    },
    {
      id: 7,
      level: "Star Six",
      team: RanksFunRes && RanksFunRes[5].toString(),
      income:
        RanksFunRes && RanksFunRes[12] ? 'Yes' : 'No',
    },
    {
      id: 8,
      level: "Star Seven",
      team: RanksFunRes && RanksFunRes[6].toString(),
      income:
        RanksFunRes && RanksFunRes[13] ? 'Yes' : 'No',
    }
  ];

  const totalDeposit = useReadContract({
    abi: contract_abi_second,
    address: contract_address_second,
    functionName: "totalDeposit",
    args: [address],
    config,
  });

  let totalDepositRes: bigint[] = [];
  totalDepositRes = totalDeposit?.data as bigint[];
  console.log("total deposit >> ", totalDepositRes);

  // the reand condition start here
  //usersCTRes is referredUsers
  useEffect(() => {
    if (
      usersCTRes &&
      usersCTRes[2] >= 5 &&
      userTeamSizeRes[0] >= 15 &&
      userTurnOverRes[0] >= 3100e18 &&
      totalDepositRes[0] >= 100e18
    ) {
      setRewardInfoRank(1);
    } else if (
      usersCTRes &&
      usersCTRes[2] >= 7 &&
      userTeamSizeRes[0] >= 30 &&
      userTurnOverRes[0] >= 10300e18 &&
      totalDepositRes[0] >= 300e18
    ) {
      setRewardInfoRank(2);
    }else if (
      usersCTRes &&
      usersCTRes[2] >= 8 &&
      userTeamSizeRes[0] >= 50 &&
      userTurnOverRes[0] >= 30500e18 &&
      totalDepositRes[0] >= 500e18
    ) {
      setRewardInfoRank(3);
    } else if (
      usersCTRes &&
      usersCTRes[2] >= 10 &&
      userTeamSizeRes[0] >= 100 &&
      userTurnOverRes[0] >= 101000e18 &&
      totalDepositRes[0] >= 1000e18
    ) {
      setRewardInfoRank(4);
    } else if (
      usersCTRes &&
      usersCTRes[2] >= 12 &&
      userTeamSizeRes[0] >= 200 &&
      userTurnOverRes[0] >= 1000000e18 &&
      totalDepositRes[0] >= 5000e18
    ) {
      setRewardInfoRank(5);
    }
    else if (
      usersCTRes &&
      usersCTRes[2] >= 14 &&
      userTeamSizeRes[0] >= 500 &&
      userTurnOverRes[0] >= 5000000e18 &&
      totalDepositRes[0] >= 10000e18
    ) {
      setRewardInfoRank(6);
    }
    else if (
      usersCTRes &&
      usersCTRes[2] >= 15 &&
      userTeamSizeRes[0] >= 1000 &&
      userTurnOverRes[0] >= 20000000e18 &&
      totalDepositRes[0] >= 25000e18
    ) {
      setRewardInfoRank(7);
    }
  }, []);

  // end read function

  return (
    <>
      <div className="row px-5 my-7">
        {/* the renk funtion from read  */}
        {/* KBC reward Info  */}
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
          </div>
        </div>
        {/* Register function  */}
        <div className="col-lg-6 mt-4 write-fun-center">
          <div className="swap-wrap p-5 ">
            <div className="swap-head text-center">Register</div>
            <div className="swap">
              <div className="swap-box">
                <Form
                  {...formItemLayout}
                  name="register"
                  onFinish={onFinishReg}
                  //   onFinishFailed={onFinishFailedReg}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Node Quantity"
                    name="nodeQuantity"
                    rules={[
                      {
                        required: true,
                        message: "Please input your nodeQuantity!",
                      },
                    ]}
                    className="node-title"
                  >
                    <Input className="input_filed" placeholder="0" />
                  </Form.Item>

                  <Form.Item
                    label="Referral ID"
                    name="referralId"
                    rules={[
                      {
                        required: true,
                        message: "Please input your referralId!",
                      },
                    ]}
                  >
                    <Input className="input_filed" placeholder="Enter ID" />
                  </Form.Item>
                  <Form.Item className="text-center">
                    <Button className="submit-btn" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Box end here --> */}

        {/* Deposit KBC  */}
        <div className="col-lg-6 mt-4 write-fun-center">
          <div className="swap-wrap p-5">
            <div className="swap-head text-center">Deposit KBC</div>
            <div className="swap">
              <div className="swap-box">
                <Form
                  {...formItemLayout}
                  name="depositDbc"
                  onFinish={onFinishDepositKBC}
                  // onFinishFailed={onFinishFailedDepositKBC}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Payable Amount"
                    name="payableAmount"
                    rules={[
                      {
                        required: true,
                        message: "Please input your payable amount!",
                      },
                    ]}
                  >
                    <Input
                      className="input_filed"
                      placeholder="Payable Amount"
                    />
                  </Form.Item>
                  <Form.Item className="text-center">
                    <Button className="submit-btn" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>

        {/* Fund Global  */}
        <div className="col-lg-6 mt-7 write-fun-center">
          <div className="swap-wrap p-5">
            <div className="swap-head text-center">Fund Global:</div>
            <div className="swap">
              <div className="swap-box">
                <Form
                  {...formItemLayout}
                  name="fundGlobal"
                  onFinish={onFinishfundGlobal}
                  // onFinishFailed={onFinishFailedfundGlobal}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Payable Amount"
                    name="payableAmount"
                    rules={[
                      {
                        required: true,
                        message: "Please input your payable amount!",
                      },
                    ]}
                  >
                    <Input
                      className="input_filed"
                      placeholder="Payable Amount"
                    />
                  </Form.Item>
                  <Form.Item className="text-center">
                    <Button className="submit-btn" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>

        {/* Fund Insurance Pool  */}
        <div className="col-lg-6 mt-7 write-fun-center">
          <div className="swap-wrap p-5">
            <div className="swap-head text-center">Insurance Pool:</div>
            <div className="swap">
              <div className="swap-box">
                <Form
                  {...formItemLayout}
                  name="InsurancePool"
                  onFinish={onFinishInsurancePool}
                  // onFinishFailed={onFinishFailedInsurancePool}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Payable Amount"
                    name="payableAmount"
                    rules={[
                      {
                        required: true,
                        message: "Please input your payable amount!",
                      },
                    ]}
                  >
                    <Input
                      className="input_filed"
                      placeholder="Payable Amount"
                    />
                  </Form.Item>
                  <Form.Item className="text-center">
                    <Button className="submit-btn" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>

        {/* Fund Set KBC price  */}
        <div className="col-lg-6 mt-7 write-fun-center">
          <div className="swap-wrap p-5">
            <div className="swap-head text-center">Set KBC Price:</div>
            <div className="swap">
              <div className="swap-box">
                <Form
                  {...formItemLayout}
                  name="SetKBCPrice"
                  onFinish={onFinishSetKBCPrice}
                  // onFinishFailed={onFinishFailedSetKBCPrice}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                      {
                        required: true,
                        message: "Please input your price!",
                      },
                    ]}
                  >
                    <Input className="input_filed" placeholder="price" />
                  </Form.Item>
                  <Form.Item className="text-center">
                    <Button className="submit-btn" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>

        {/* TopUp function  */}
        <div className="col-lg-6 mt-7 write-fun-center">
          <div className="swap-wrap p-5">
            <div className="swap-head text-center">Top Up</div>
            <div className="swap">
              <div className="swap-box">
                <Form
                  {...formItemLayout}
                  name="topup"
                  onFinish={onFinishtopup}
                  // onFinishFailed={onFinishFailedtopup}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Payable Amount"
                    name="payableamount"
                    rules={[
                      {
                        required: true,
                        message: "Please input your payableamount!",
                      },
                    ]}
                    className="node-title"
                  >
                    <Input
                      className="input_filed"
                      placeholder="Payable Amount (ether)"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[
                      {
                        required: true,
                        message: "Please input your amount!",
                      },
                    ]}
                  >
                    <Input className="input_filed" placeholder="Amount" />
                  </Form.Item>
                  <Form.Item className="text-center">
                    <Button className="submit-btn" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>

        {/* withDrawal Income  */}
        <div className="col-lg-6 mt-7 write-fun-center">
          <div className="swap-wrap p-5">
            <div className="swap-head text-center">Withdrawal Income</div>
            <div className="swap">
              <div className="swap-box">
                <div className="node">
                  <p className="node-title">Withdrawal Income</p>
                  <input
                    className="input-node bg-dashboard form-control ps-2"
                    value="4502.00 KBC"
                    type="text"
                    disabled
                  />
                </div>
                <div className="pay text-center mt-5">
                  <Button
                    onClick={withDrawalIncomeNow}
                    className="submit-btn"
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* withDrawal ROI  */}
        <div className="col-lg-6 mt-7 write-fun-center">
          <div className="swap-wrap p-5">
            <div className="swap-head text-center">Withdrawal ROI</div>
            <div className="swap">
              <div className="swap-box">
                <div className="node">
                  <p className="node-title">Withdrawal Balance</p>
                  <input
                    className="input-node bg-dashboard form-control ps-2"
                    value="4502.00 KBC"
                    type="text"
                    disabled
                  />
                </div>
                <div className="pay text-center mt-5">
                  <Button
                    onClick={withdrawROI}
                    className="submit-btn"
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Withdrawl Coin  */}
        <div className="col-lg-6 mt-7 write-fun-center">
          <div className="swap-wrap p-5">
            <div className="swap-head text-center">
              Withdrawl Coin : <span className="text-warningDD">KBC</span>
            </div>
            <div className="swap">
              <div className="swap-box">
                <Form
                  {...formItemLayout}
                  name="withdralCoin"
                  onFinish={onFinishwithdralCoin}
                  autoComplete="off"
                >
                  <Form.Item
                    label="To Address"
                    name="toAddress"
                    rules={[
                      {
                        required: true,
                        message: "Please input your toAddress!",
                      },
                    ]}
                    className="node-title"
                  >
                    <Input className="input_filed" placeholder="To Address" />
                  </Form.Item>
                  <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[
                      {
                        required: true,
                        message: "Please input your amount!",
                      },
                    ]}
                  >
                    <Input className="input_filed" placeholder="Amount" />
                  </Form.Item>
                  <Form.Item className="text-center">
                    <Button className="submit-btn" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WriteAbleFun;
