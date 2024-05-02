import { useContractRead } from "wagmi";
import { useAccount } from "wagmi";
 
import { contract_address } from "../contract/addresses";
import { abi } from "../contract/abi";

const Header = () => {
  const { address } = useAccount();
  const { data } = useContractRead({
    abi,
    address: contract_address,
    functionName: "income",
    args: [`${address}`],
  });

  return (
    <>
      <div className="head-card skew mx-5 mt-4">
        <div className="row">
          <div className="col-lg-2 col-sm-6">
            <div className="box">
              <p className="cards-numbers">
                {data && data[0] || 0}
                <span className="sub-number"> KBC</span>
              </p>
              <p className="cards-title">Direct Income</p>
            </div>
          </div>
          <div className="col-lg-2 col-sm-6">
            <div className="box">
              <p className="cards-numbers">
                {data && data[1] || 0}
                <span className="sub-number"> KBC</span>
              </p>
              <p className="cards-title">On Team ROI</p>
            </div>
          </div>
          <div className="col-lg-2 col-sm-6">
            <div className="box">
              <p className="cards-numbers">
                {data && data[2] || 0}
                <span className="sub-number"> KBC</span>
              </p>
              <p className="cards-title">Top 4 Income</p>
            </div>
          </div>
          <div className="col-lg-2 col-sm-6">
            <div className="box">
              <p className="cards-numbers">
              {data && data[3] || 0} <span className="sub-number">KBC</span>
              </p>
              <p className="cards-title">Total Income</p>
            </div>
          </div>
          <div className="col-lg-2 col-sm-6">
            <div className="box">
              <p className="cards-numbers">
              {data && data[5] || 0} <span className="sub-number">KBC</span>
              </p>
              <p className="cards-title">Taken Income</p>
            </div>
          </div>
          <div className="col-lg-2 col-sm-6">
            <div className="box">
              <p className="cards-numbers">
              {data && data[5] || 0} <span className="sub-number">KBC</span>
              </p>
              <p className="cards-title">Balance Income</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
