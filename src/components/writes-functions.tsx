import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useAccount, useReadContract } from "wagmi";
import { parseEther } from "ethers/utils";
import { BigNumberish } from "ethers";
import BigNumber from "bignumber.js";

import { simulateContract, writeContract } from "@wagmi/core";

// import { useSendTransaction, useWaitForTransaction } from "@wagmi/core";
import { formatEther } from "ethers/utils";

import {
  contract_address,
  contract_abi,
  contract_current_admin,
  contract_address_stable_coin_usdt,
  contract_abi_stabel_coin_usdt,
  contract_address_bnb_kbc,
  contract_abi_bnb_kbc,
  contract_price_pool,
} from "../contract";
import { config } from "../config";

import { check_usd_price, check_KBC_Price } from "../utils/convert-to-eth";

const WriteAbleFun = () => {
  const [rewardInfoRank, setRewardInfoRank] = useState(0);
  const [withDrawlVal, setWithDrawalVal] = useState(0);
  const [withDrawlROI, setWithDrawalROI] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [kbcVal, setKbcVal] = useState<number>(1);
  const [usdVal, setUsdVal] = useState<string>("");
  const [calKBC, setCalKBC] = useState<string>("");

  // setKBCVal;
  const [nodeQ_val, setNodeQ_val] = useState<number>(1);

  const { address } = useAccount();
  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  // USDT to KBC Conversion

  const BalanceOfKBC = useReadContract({
    abi: contract_abi_bnb_kbc,
    address: contract_address_bnb_kbc,
    functionName: "balanceOf",
    args: [contract_price_pool],
    config,
  });

  // console.log('BalanceOfKBC wai value', BalanceOfKBC.data);

  // const KBC_bal = convert_eth_from_biginit(BalanceOfKBC.data as bigint)
  // console.log('utils KBC_bal ', KBC_bal);
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

  const KBC_price = check_KBC_Price(
    BalanceOfKBC.data as bigint,
    BalanceOfStableCoin.data as bigint
  );
  useEffect(() => {
    setCalKBC(KBC_price.toString());
  }, [BalanceOfKBC.data, BalanceOfStableCoin.data]);

  // end conversion

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = parseInt(event.target.value, 10);
    setKbcVal(isNaN(inputVal) ? 0 : inputVal);
    const nodeVal = inputVal * Number(usdVal);
    setNodeQ_val(nodeVal);
  };
  const AdminFun = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "ownerWallet",
    config,
  });

  useEffect(() => {
    if (address && contract_current_admin) {
      if (address.toLowerCase() == contract_current_admin.toLowerCase()) {
        setIsOwner(true);
      }
    }
  }, []);

  const WithDrawlValRes = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "income",
    args: [address],
    config,
  });

  let WithDrawlValData: bigint[] = [];
  WithDrawlValData = WithDrawlValRes?.data as bigint[];

  useEffect(() => {
    if (WithDrawlValRes.data) {
      const newValue: number = Number(WithDrawlValData[5]); // Convert bigint to number
      setWithDrawalVal(newValue);
    }
  }, []);

  const WithDrawlROIRes = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "withdrawableROI",
    args: ["0xE8dF0d71928C22f5955f407BbEaE36232Cf83F53"], // address
    config,
  });

  const currRount_val = !isNaN(parseFloat(WithDrawlROIRes.data as string))
    ? new BigNumber(WithDrawlROIRes.data as number).toString()
    : 0;
  useEffect(() => {
    const withDrawalData = Number(currRount_val);
    const kbcPrice = Number(KBC_price);
    if (!isNaN(withDrawalData) && !isNaN(kbcPrice) && kbcPrice !== 0) {
      // Output: 600000000000000000000000000000000000n

      let valueStr = currRount_val.toString(); //currRount_val.toString();

      if (valueStr.includes(".")) {
        valueStr = valueStr.split(".")[0];
      }

      const bigIntValue = BigInt(valueStr);

      const kbcPriceBigInt = KBC_price as BigNumber;
      const bigIntValueAsBigNumber = bigIntValue.toString() as BigNumber;

      let roi = (bigIntValueAsBigNumber / kbcPriceBigInt).toString();
      console.log("roi: ", roi.toString());
      if (roi.includes(".")) {
        roi = roi.split(".")[0];
      }

      // const formattedROI = formatEther(roi);
      // console.log("Formatted ROI: ", formattedROI);

      // setWithDrawalROI(formattedROI);
      let roiStr = roi.toString();

      // // Remove any fractional part to ensure the value is an integer
      if (roiStr.includes(".")) {
        roiStr = roiStr.split(".")[0];
      }

      const formattedValue = roiStr; //arseEther(roiStr.toString());

      console.log("Formatted ROI: ", formattedValue);
      setWithDrawalROI(Number(formattedValue ? formattedValue : 0));
    } else {
      console.error("Invalid input data", { withDrawalData, kbcPrice });
      // Handle the error appropriately, for example by setting a default value or showing an error message
      setWithDrawalROI(0); // Example fallback value
    }

    // if (WithDrawlROIRes.data) {
    //   setWithDrawalROI(
    //     formatEther(
    //       (Number(WithDrawlROIRes.data) / Number(KBC_price)).toString()
    //     )
    //   );
    // }
  }, [Number(currRount_val)]);

  // register function start
  type RegistrationValues = {
    nodeQuantity: string;
    referralId: string;
  };

  const onFinishReg = async (values: RegistrationValues) => {
    console.log(
      " parseEther(nodeQ_val.toString())",
      parseEther(nodeQ_val.toString()),
      values.referralId
    );
    try {
      const { request } = await simulateContract(config, {
        abi: contract_abi,
        address: contract_address,
        functionName: "Registration",
        args: [values.referralId],
        value: parseEther(nodeQ_val.toString()),
      });
      console.log("Request :", request);

      const hash = await writeContract(config, request);
      console.log("hash", hash);
    } catch (error) {
      const startIndex = error.message.indexOf(":") + 2; // Skip ": "
      const endIndex = error.message.indexOf("\nContract Call");
      const reason = error.message.substring(startIndex, endIndex).trim();
      console.log("startIndex", startIndex, endIndex, reason.length);
      console.log("Extracted reason:", reason);
      if (reason.length > 100) {
        alert("Insufficiant amount in account to perform this transaction ");
      } else alert("Error Got Expected : " + reason);
    }
  };

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
        const startIndex = error.message.indexOf(":") + 2; // Skip ": "
        const endIndex = error.message.indexOf("\nContract Call");
        const reason = error.message.substring(startIndex, endIndex).trim();
        if (reason.length > 100) {
          alert("Insufficiant amount in account to perform this transaction ");
        } else alert("Error Got Expected : " + reason);
      }

      // };
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  // Close round
  const closeRound = async () => {
    if (address) {
      try {
        // console.log("values", values);

        const { request } = await simulateContract(config, {
          abi: contract_abi,
          address: contract_address,
          functionName: "closeRound",
        });
        const hash = await writeContract(config, request);
        console.log("hash", hash);
      } catch (error) {
        const startIndex = error.message.indexOf(":") + 2; // Skip ": "
        const endIndex = error.message.indexOf("\nContract Call");
        const reason = error.message.substring(startIndex, endIndex).trim();
        if (reason.length > 100) {
          alert("Insufficiant amount in account to perform this transaction ");
        } else alert("Error Got Expected : " + reason);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  // withdrawal Income
  const withdrawlIncome = async () => {
    if (address) {
      try {
        const { request } = await simulateContract(config, {
          abi: contract_abi,
          address: contract_address,
          functionName: "withdrawIncome",
        });
        const hash = await writeContract(config, request);
        console.log("hash", hash);
      } catch (error) {
        const startIndex = error.message.indexOf(":") + 2; // Skip ": "
        const endIndex = error.message.indexOf("\nContract Call");
        const reason = error.message.substring(startIndex, endIndex).trim();
        if (reason.length > 100) {
          alert("Insufficiant amount in account to perform this transaction ");
        } else alert("Error Got Expected : " + reason);
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
        const startIndex = error.message.indexOf(":") + 2; // Skip ": "
        const endIndex = error.message.indexOf("\nContract Call");
        const reason = error.message.substring(startIndex, endIndex).trim();
        if (reason.length > 100) {
          alert("Insufficiant amount in account to perform this transaction ");
        } else alert("Error Got Expected : " + reason);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  // end Deposit kbc function
  // fundGlobal

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
        const startIndex = error.message.indexOf(":") + 2; // Skip ": "
        const endIndex = error.message.indexOf("\nContract Call");
        const reason = error.message.substring(startIndex, endIndex).trim();
        if (reason.length > 100) {
          alert("Insufficiant amount in account to perform this transaction ");
        } else alert("Error Got Expected : " + reason);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  // end fundGlobal function
  // InsurancePool payableAmount

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
        const startIndex = error.message.indexOf(":") + 2; // Skip ": "
        const endIndex = error.message.indexOf("\nContract Call");
        const reason = error.message.substring(startIndex, endIndex).trim();
        if (reason.length > 100) {
          alert("Insufficiant amount in account to perform this transaction ");
        } else alert("Error Got Expected : " + reason);
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
  const onFinishWithDrawReward = async (values: SetKBCPrice) => {
    if (address) {
      try {
        const { request } = await simulateContract(config, {
          abi: contract_abi,
          address: contract_address,
          functionName: "withdrawReward",
          args: [values.price],
          // value: parseEther(values.payableAmount),
        });

        const hash = await writeContract(config, request);

        console.log("Transaction successful!", hash);
      } catch (error) {
        const startIndex = error.message.indexOf(":") + 2; // Skip ": "
        const endIndex = error.message.indexOf("\nContract Call");
        const reason = error.message.substring(startIndex, endIndex).trim();
        if (reason.length > 100) {
          alert("Insufficiant amount in account to perform this transaction ");
        } else alert("Error Got Expected : " + reason);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  // end SetKBCPrice function

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
        const startIndex = error.message.indexOf(":") + 2; // Skip ": "
        const endIndex = error.message.indexOf("\nContract Call");
        const reason = error.message.substring(startIndex, endIndex).trim();
        if (reason.length > 100) {
          alert("Insufficiant amount in account to perform this transaction ");
        } else alert("Error Got Expected : " + reason);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  //   // end TopUp function
  //   // withdralCoin
  // type WithdralCoin = {
  //   toAddress: string;
  //   amount: string;
  // };

  type CloserAddress = {
    closerAddress: string;
    address: string;
  };

  // start fund Global function
  const onsetRoundCloserAddress = async (values: CloserAddress) => {
    if (address) {
      try {
        console.log("Value is: ", values.address);
        const { request } = await simulateContract(config, {
          abi: contract_abi,
          address: contract_address,
          functionName: "setRoundCloserAddress",
          args: [values.address],
        });

        const hash = await writeContract(config, request);

        console.log("Transaction successful!", hash);
      } catch (error) {
        const startIndex = error.message.indexOf(":") + 2; // Skip ": "
        const endIndex = error.message.indexOf("\nContract Call");
        const reason = error.message.substring(startIndex, endIndex).trim();
        if (reason.length > 100) {
          alert("Insufficiant amount in account to perform this transaction ");
        } else alert("Error Got Expected : " + reason);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  // read function start

  const usersCT = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "users",
    args: [address],
    config,
  });

  let usersCTRes: bigint[] = [];
  usersCTRes = usersCT?.data as bigint[];

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
  // console.log(
  //   "Rurn Over Value: ",
  //   parseFloat(formatEther(userTurnOverRes.toString())).toFixed(4),
  //   userTurnOverRes
  // );

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
      value: usersCTRes ? usersCTRes[5] : 0,
    },
  ];

  // ranks

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

  const totalDeposit = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "totalDeposit",
    args: [address],
    config,
  });

  let totalDepositRes: bigint[] = [];
  totalDepositRes = totalDeposit?.data as bigint[];
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
    } else if (
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
    } else if (
      usersCTRes &&
      usersCTRes[2] >= 14 &&
      userTeamSizeRes[0] >= 500 &&
      userTurnOverRes[0] >= 5000000e18 &&
      totalDepositRes[0] >= 10000e18
    ) {
      setRewardInfoRank(6);
    } else if (
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
      <div className="row px-5">
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
        <div className="col-lg-6 mt-4">
          <div className="swap-wrap p-5 mt-40 position-relative">
            <div className="reg-calac position-absolutex top-15 d-flexx text-center mb-2">
              <div className="">
                <input
                  className="clac-field"
                  value={kbcVal}
                  type="number"
                  pattern="[0-9]*"
                  name="clac-field"
                />
                <span className="kbc-val">
                  {kbcVal === 1 ? usdVal : Number(usdVal) * kbcVal}
                </span>
              </div>
              <div className="ml-4x mt-2">
                <span className="clr-base">1 USDT</span>{" "}
                <span className="clr-base ml-2">=</span>
                <span className="kbc-val">
                  {kbcVal === 1 ? usdVal : Number(usdVal)} KBC
                </span>
              </div>
            </div>
            <div className="swap-head text-center">Register</div>
            <div className="swap">
              <div className="swap-box">
                <Form
                  {...formItemLayout}
                  name="register"
                  onFinish={onFinishReg}
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
                    {/* <input type="hidden"  /> */}
                    <Input
                      className="input_filed"
                      placeholder="0"
                      value={nodeQ_val}
                      onChange={handleChange}
                    />
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

        {/* Fund Global  */}
        <div className="col-lg-6">
          <div className="swap-wrap p-5 mt-45">
            <div className="swap-head text-center">Fund Global:</div>
            <div className="swap1">
              <div className="swap-box">
                <Form
                  {...formItemLayout}
                  name="fundGlobal"
                  onFinish={onFinishfundGlobal}
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
        <div className="col-lg-6">
          <div className="swap-wrap p-5">
            <div className="swap-head text-center">Insurance Pool:</div>
            <div className="swap1">
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
        <div className="col-lg-6">
          <div className="swap-wrap p-5">
            <div className="swap-head text-center">Withdraw Reward</div>
            <div className="swap1">
              <div className="swap-box">
                <Form
                  {...formItemLayout}
                  name="withDrawReward"
                  onFinish={onFinishWithDrawReward}
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
        {/* withDrawal Income  */}
        {isOwner && (
          <div className="col-lg-6">
            <div className="swap-wrap p-5">
              <div className="swap-head text-center">Withdrawal Income</div>
              <div className="swap1">
                <div className="swap-box">
                  <Form
                    {...formItemLayout}
                    name="withdrawalIncome"
                    onFinish={withDrawalIncomeNow}
                    autoComplete="off"
                  >
                    <Form.Item label="Withdrawal Income" name="withdrawlPrice">
                      <Input
                        className="input_filed disable-to"
                        value={`${withDrawlVal} KBC`}
                        placeholder="price"
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
        )}

        {/* withDrawal Income  */}
        {/* {isOwner && (
          <div className="col-lg-6">
            <div className="swap-wrap p-5">
              <div className="swap-head text-center">Withdrawal Income</div>
              <div className="swap1">
                <div className="swap-box">
                  <div className="node">
                    <p className="node-title label-clr">Withdrawal Income</p>
                    <input
                      className="input-node bg-dashboard form-control ps-2"
                      value={`${withDrawlVal} KBC`}
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
        )} */}

        {/* withDrawal ROI  */}

        <div className="col-lg-6">
          <div className="swap-wrap p-5">
            <div className="swap-head text-center">Withdrawal ROI</div>
            <div className="swap1">
              <div className="swap-box">
                <Form
                  {...formItemLayout}
                  name="withdrawROI"
                  onFinish={withdrawROI}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Withdrawal Balance"
                    name="withdrawalBalance"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Please input your price!",
                    //   },
                    // ]}
                  >
                    <Input
                      className="input_filed disable-to"
                      value={`${withDrawlROI} KBC`}
                      placeholder={`${withDrawlROI} KBC`}
                      // disabled
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

        {/* closeRound (0xe278fe6f)  */}
        {isOwner && (
          <div className="col-lg-6">
            <div className="swap-wrap p-5">
              <div className="swap-head text-center"> Close Round</div>
              <div className="swap1">
                <div className="swap-box">
                  <div className="pay text-center mt-5">
                    <Button
                      onClick={closeRound}
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
        )}

        {/* withdrawIncome (0xe278fe6f)  */}
        <div className="col-lg-6">
          <div className="swap-wrap p-5">
            <div className="swap-head text-center"> Withdrawl Income</div>
            <div className="swap1">
              <div className="swap-box">
                <div className="pay text-center mt-5">
                  <Button
                    onClick={withdrawlIncome}
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
        {/* setRoundCloserAddress (0x29b51cff)  */}
        {isOwner && (
          <div className="col-lg-6">
            <div className="swap-wrap p-5 mt-45">
              <div className="swap-head text-center">
                Set Round Closer Address
              </div>
              <div className="swap1">
                <div className="swap-box">
                  <Form
                    {...formItemLayout}
                    name="closerAddress"
                    onFinish={onsetRoundCloserAddress}
                    // onFinishFailed={onFinishFailedfundGlobal}
                    autoComplete="off"
                  >
                    <Form.Item
                      label="Round Closer"
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: "Please input your closer address!",
                        },
                      ]}
                    >
                      <Input className="input_filed" placeholder="address" />
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
        )}

        {/* TopUp function  */}
        <div className="col-lg-6">
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
      </div>
    </>
  );
};

export default WriteAbleFun;
