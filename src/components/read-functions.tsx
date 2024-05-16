import { formatEther } from "ethers/utils";
import BigNumber from "bignumber.js";
import dayjs from "dayjs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useAccount, useReadContract } from "wagmi";
import { BigNumberish } from "ethers";

import { contract_address, contract_abi } from "../contract";
import { config } from "../config";

import "swiper/css";
const Slider = () => {
  const { address } = useAccount();

  // function 1
  const InsurancePoolActive = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "InsurancePoolActive",
    config,
  });

  // function 2
  const KbcPrice = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "KbcPrice",
    config,
  });

  const kbcethValue = KbcPrice.data
    ? formatEther(KbcPrice.data as BigNumberish)
    : 0;

  // function 4
  const currRound = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "currRound",
    config,
  });

  const currRount_val = !isNaN(parseFloat(currRound.data as string))
    ? new BigNumber(currRound.data as number).toString()
    : 0;

  // function 5
  const currRoundStartTime = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "currRoundStartTime",
    config,
  });

  // function 6
  const currUserID = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "currUserID",
    config,
  });

  const currUserID_val = currUserID.data
    ? parseInt(currUserID.data as string)
    : 0;

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

  // function 19
  const stakedUSDT = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "stakedUSDT",
    args: [address],
    config,
  });

  const stakedUSDTEth = stakedUSDT.data
    ? formatEther(stakedUSDT.data as BigNumberish)
    : 0;

  // function 23
  const withdrawableROI = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "withdrawableROI",
    args: [address],
    config,
  });

  const withdrawableROIEth = withdrawableROI.data
    ? formatEther(withdrawableROI.data as BigNumberish)
    : 0;

  const sliderData = [
    {
      value: InsurancePoolActive.data ? "True" : "False",
      funName: "Insurance Pool Active",
    },
    {
      value: kbcethValue,
      funName: "KBC Price",
    },
    {
      value: currRount_val,
      funName: "current Round",
    },
    {
      value:
        dayjs(Number(currRoundStartTime.data) * 1000).format("DD-MMM-YYYY") ||
        "00-Month-0000",
      funName: "Round Start Time",
    },
    {
      value: currUserID_val,
      funName: "User ID",
    },
    {
      value: globalethValue,
      funName: "Global Pool",
    },
    {
      value: stakedUSDTEth,
      funName: "Staked USDT",
    },
    {
      value: withdrawableROIEth,
      funName: "With Drawable ROI",
    },
  ];

  return (
    <>
      <Swiper
        spaceBetween={24}
        slidesPerView={1}
        className="mt-4 px-5"
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2.5,
          },
          1024: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {sliderData.map((e, i) => (
          <>
            <SwiperSlide key={i}>
              <div  key={i} className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between flex-column h-100">
                    <h6 className="slide-number">{e.value}</h6>
                    <p className="slide-title">{e.funName}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </>
  );
};
export default Slider;
