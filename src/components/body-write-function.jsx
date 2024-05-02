import { Button, Form, Input } from "antd";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { contract_address } from "../contract/addresses";
import { abi } from "../contract/abi";

let provider = new ethers.BrowserProvider(window.ethereum);
let signer = await provider.getSigner();
const contract = new ethers.Contract(contract_address, abi, signer);

const WriteAbleFun = () => {
  const { address } = useAccount();
  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  // register function start
  const onFinishReg = async (values) => {
    if (address) {
      try {
        const transaction = await contract.Registration(values.referralId, {
          value: values.nodeQuantity,
        });
        await transaction.wait(); // Wait for the transaction to be mined
        console.log("Transaction successful!");
      } catch (error) {
        console.error("Error sending transaction to contract:", error);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  const onFinishFailedReg = (errorInfo) => {
    console.log("Failed:>>>>", errorInfo);
  };
  // end register function

  // with drwal ROI function
  const withdrawROI = async () => {
    if (address) {
      try {
        const transaction = await contract.withdrawROI();
        await transaction.wait(); // Wait for the transaction to be mined
        console.log("Transaction successful!");
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
        const transaction = await contract.withdrawIncome();
        await transaction.wait(); // Wait for the transaction to be mined
        console.log("Transaction successful!");
      } catch (error) {
        console.error("Error sending transaction to contract:", error);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  // deposit KBC
  const onFinishDepositKBC = async (values) => {
    if (address) {
      try {
        const transaction = await contract.depositKBC({
          value: values.payableAmount,
        });
        await transaction.wait(); // Wait for the transaction to be mined
        console.log("Transaction successful!");
      } catch (error) {
        console.error("Error sending transaction to contract:", error);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  const onFinishFailedDepositKBC = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // end Deposit kbc function
  // fundGlobal

  // start fund Global function
  const onFinishfundGlobal = async (values) => {
    if (address) {
      try {
        const transaction = await contract.fundGlobalPool({
          value: values.payableAmount,
        });
        await transaction.wait(); // Wait for the transaction to be mined
        console.log("Transaction successful!");
      } catch (error) {
        console.error("Error sending transaction to contract:", error);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  const onFinishFailedfundGlobal = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // end fundGlobal function

  // InsurancePool

  // start InsurancePool function
  const onFinishInsurancePool = async (values) => {
    if (address) {
      try {
        const transaction = await contract.fundInsurancePool({
          value: values.payableAmount,
        });
        await transaction.wait(); // Wait for the transaction to be mined
        console.log("Transaction successful!");
      } catch (error) {
        console.error("Error sending transaction to contract:", error);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  const onFinishFailedInsurancePool = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // endInsurancePool function

  // start SetKBCPrice function
  const onFinishSetKBCPrice = async (values) => {
    if (address) {
      try {
        const transaction = await contract.setKbcPrice({
          value: values.price,
        });
        await transaction.wait(); // Wait for the transaction to be mined
        console.log("Transaction successful!");
      } catch (error) {
        console.error("Error sending transaction to contract:", error);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  const onFinishFailedSetKBCPrice = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // end SetKBCPrice function

  //start TopUp function
  const onFinishtopup = async (values) => {
    if (address) {
      try {
        const formattedAmount = ethers.BigNumber.from(values.amount);
        const formattedOptions = { payable: values.payable || false }; // Set default payable to false

        console.log("formattedAmount >>", formattedAmount);
        console.log("formattedOptions >>", formattedOptions);
        const transaction = await contract.topUp(
          formattedAmount,
          formattedOptions
        );
        await transaction.wait(); // Wait for the transaction to be mined
        console.log("Transaction successful!");
      } catch (error) {
        console.error("Error sending transaction to contract:", error);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  const onFinishFailedtopup = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // end TopUp function
  // withdralCoin

  //start withdralCoin function
  const onFinishwithdralCoin = async (values) => {
    if (address) {
      try {
        const transaction = await contract.withdrawalCoin(values.toAddress, values.amount);
        await transaction.wait(); // Wait for the transaction to be mined
        console.log("Transaction successful!");
      } catch (error) {
        console.error("Error sending transaction to contract:", error);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  const onFinishFailedwithdralCoin = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // end withdralCoin function

  return (
    <>
      <div className="row px-5">
        {/* Register function  */}
        <div className="col-lg-6 mt-4">
          <div className="swap-wrap p-5">
            <div className="swap-head text-center">Register</div>
            <div className="swap">
              <div className="swap-box">
                <Form
                  {...formItemLayout}
                  name="register"
                  onFinish={onFinishReg}
                  onFinishFailed={onFinishFailedReg}
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
        <div className="col-lg-6 mt-4">
          <div className="swap-wrap p-5">
            <div className="swap-head text-center">Deposit KBC</div>
            <div className="swap">
              <div className="swap-box">
                <Form
                  {...formItemLayout}
                  name="depositDbc"
                  onFinish={onFinishDepositKBC}
                  onFinishFailed={onFinishFailedDepositKBC}
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
        <div className="col-lg-6 mt-4">
          <div className="swap-wrap p-5">
            <div className="swap-head text-center">Fund Global:</div>
            <div className="swap">
              <div className="swap-box">
                <Form
                  {...formItemLayout}
                  name="fundGlobal"
                  onFinish={onFinishfundGlobal}
                  onFinishFailed={onFinishFailedfundGlobal}
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
        <div className="col-lg-6 mt-4">
          <div className="swap-wrap p-5">
            <div className="swap-head text-center">Insurance Pool:</div>
            <div className="swap">
              <div className="swap-box">
                <Form
                  {...formItemLayout}
                  name="InsurancePool"
                  onFinish={onFinishInsurancePool}
                  onFinishFailed={onFinishFailedInsurancePool}
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
        <div className="col-lg-6 mt-4">
          <div className="swap-wrap p-5">
            <div className="swap-head text-center">Set KBC Price:</div>
            <div className="swap">
              <div className="swap-box">
                <Form
                  {...formItemLayout}
                  name="SetKBCPrice"
                  onFinish={onFinishSetKBCPrice}
                  onFinishFailed={onFinishFailedSetKBCPrice}
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
        <div className="col-lg-6 mt-4">
          <div className="swap-wrap p-5">
            <div className="swap-head text-center">Top Up</div>
            <div className="swap">
              <div className="swap-box">
                <Form
                  {...formItemLayout}
                  name="topup"
                  onFinish={onFinishtopup}
                  onFinishFailed={onFinishFailedtopup}
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
        <div className="col-lg-6 mt-4">
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
        <div className="col-lg-6 mt-4">
          <div className="swap-wrap p-5">
            <div className="swap-head text-center">
              Withdrawal ROI
              {/* <span className="text-warningDD"> Wallet</span> */}
            </div>
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
        <div className="col-lg-6 mt-4">
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
                  onFinishFailed={onFinishFailedwithdralCoin}
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
