import { useContractRead } from "wagmi";
import { useAccount } from "wagmi";
 
import { contract_address } from "../contract/addresses";
import { abi } from "../contract/abi";


const UserInfo = () => {
  const { address } = useAccount();
  const { data } = useContractRead({
    abi,
    address: contract_address,
    functionName: "reportsUSDT",
    args: [`${address}`],
  });

  const userData = useContractRead({
    abi,
    address: contract_address,
    functionName: "users",
    args: [`${address}`],
    account: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  });
  
  const userDetail = userData?.data

  return (
    <>
      <div className="row px-5">
        <div className="col-lg-6">
          <div className="d-flex justify-content-center mt-4">
            <div className="network-heading text-center rounded-top-2">
              KBC User info
            </div>
          </div>

          <div className="user-box">
            <div className="user-item">
              <div className="col-6 user-title">User ID:</div>
              <div className="col-6 user-value">{userDetail && userDetail[1] || 0 }</div>
            </div>
            <div className="user-item">
              <div className="col-6 user-title">Referrer ID:</div>
              <div className="col-6 user-value">
              {userDetail && userDetail[2] || 0 }
              </div>
            </div>
            <div className="user-item">
              <div className="col-6 user-title">Staked KBC:</div>
              <div className="col-6 user-value">{userDetail && userDetail[3] || 0 }</div>
            </div>
            <div className="user-item">
              <div className="col-6 user-title">At Price</div>
              <div className="col-6 user-value">
              {userDetail && userDetail[4] || 0 } <small>KBC</small>
              </div>
            </div>
            <div className="user-item">
              <div className="col-6 user-title">Referred Users</div>
              <div className="col-6 user-value">
              {userDetail && userDetail[4] || 0 } <small>Users</small>
              </div>
            </div>
            <div className="user-item">
              <div className="col-6 user-title">Total income</div>
              <div className="col-6 user-value">
              {userDetail && userDetail[5] || 0 } <small>KBC</small>
              </div>
            </div>
            <div className="user-item">
              <div className="col-6 user-title">Root Balance</div>
              <div className="col-6 user-value">{userDetail && userDetail[6] || 0 } KBC</div>
            </div>
            <div className="user-item">
              <div className="col-6 user-title">Assured Reward</div>
              <div className="col-6 user-value">{userDetail && userDetail[7] || 0 }</div>
            </div>
            <div className="user-item">
              <div className="col-6 user-title">Level Income</div>
              <div className="col-6 user-value">{userDetail && userDetail[8] || 0 }</div>
            </div>
            <div className="user-item">
              <div className="col-6 user-title">Token ROI</div>
              <div className="col-6 user-value">
              {userDetail && userDetail[9] || 0 } <small>KBC</small>
              </div>
            </div>
            <div className="user-item">
              <div className="col-6 user-title">Stake Times</div>
              <div className="col-6 user-value">{userDetail && userDetail[10] || 0 }</div>
            </div>
            <div className="user-item">
              <div className="col-6 user-title">income Missed</div>
              <div className="col-6 user-value">
              {userDetail && userDetail[11] || 0 } <small>KBC</small>
              </div>
            </div>
            {/* <div className="user-item">
              <div className="col-6 user-title">Register time</div>
              <div className="col-6 user-value">
              {userDetail[12] || 0 } <small>KBC</small>
              </div>
            </div>
            <div className="user-item">
              <div className="col-6 user-title">Mint Day</div>
              <div className="col-6 user-value">
              {userDetail[14] || 0 } <small>KBC</small>
              </div>
            </div> */}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="d-flex justify-content-center mt-4">
            <div className="network-heading text-center rounded-top-2">
              KBC Network info
            </div>
          </div>
          <div className="network-box">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6 col-6 network-item">
                <p className="network-number m-0 p-0">
                  {data && data[8] || 0} <span className="sub-title">KBC</span>
                </p>
                <p className="network-title m-0 p-0">
                Top4PoolForwardedUSDT
                </p>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-6  network-item">
                <p className="network-number m-0 p-0">
                {data && data[9] || 0}  <span className="sub-title">KBC</span>
                </p>
                <p className="network-title m-0 p-0">Top4PoolUSDT</p>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-6  network-item">
                <p className="network-number m-0 p-0">
                {data && data[10] || 0}  <span className="sub-title">KBC</span>
                </p>
                <p className="network-title m-0 p-0">Top4Pool2DistributeUSDT</p>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-6  network-item">
                <p className="network-number m-0 p-0">
                {data && data[10] || 0}  <span className="sub-title">KBC</span>
                </p>
                <p className="network-title m-0 p-0">ActualTOUSDT</p>
              </div>
            </div>
          </div>
          <div className="reward-box">
            <div className="d-flex justify-content-center">
              <span className="text-pink fs-3">Today winner</span>
            </div>
            <div className="text-center mt-2">
              <p className="m-0 text-warning">Top One</p>
              <p className="m-0">{data && data[4] || '0x0000000000000000000000000000000000000000'}</p>
              <p className="m-0">
                Reward : <span className="fw-bold">{data && data[0] || 0}</span> KBC
              </p>
              <div className="d-flex justify-content-center">
                <div className="bar"></div>
              </div>
            </div>
            <div className="text-center mt-2">
              <p className="m-0 text-warning">Top two</p>
              <p className="m-0">{data && data[5] || '0x0000000000000000000000000000000000000000'}</p>
              <p className="m-0">
                Reward : <span className="fw-bold">{data && data[1] || 0}</span> KBC
              </p>
              <div className="d-flex justify-content-center">
                <div className="bar"></div>
              </div>
            </div>
            <div className="text-center mt-2">
              <p className="m-0 text-warning">Top there</p>
              <p className="m-0">{data && data[6] || '0x0000000000000000000000000000000000000000'}</p>
              <p className="m-0">
                Reward : <span className="fw-bold">{data && data[2] || 0}</span> KBC
              </p>
              <div className="d-flex justify-content-center">
                <div className="bar"></div>
              </div>
            </div>
            <div className="text-center mt-2">
              <p className="m-0 text-warning">Top Four</p>
              <p className="m-0">{data && data[7] || '0x0000000000000000000000000000000000000000'}</p>
              <p className="m-0">
                Reward : <span className="fw-bold">{data && data[3] || 0}</span> KBC
              </p>
              <div className="d-flex justify-content-center">
                <div className="bar"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserInfo;
