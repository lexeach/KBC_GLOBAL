import { ethers } from 'ethers';
import dayjs from 'dayjs'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import { useContractRead, useAccount } from "wagmi";

import { contract_address } from "../contract/addresses";
import { abi } from "../contract/abi";

const Slider = () => {
  const { address } = useAccount();


  // // function 1
  const InsurancePoolActive = useContractRead({
    abi,
    address: contract_address,
    functionName: "InsurancePoolActive",
    args: [`${address}`],
  });

  // function 2
  const KbcPrice = useContractRead({
    abi,
    address: contract_address,
    functionName: "KbcPrice",
    // args: [`${address}`],
  });

  // function 4
  const currRound = useContractRead({
    abi,
    address: contract_address,
    functionName: "currRound",
    // args: [`${address}`],
  });

  // function 5
  const currRoundStartTime = useContractRead({
    abi,
    address: contract_address,
    functionName: "currRoundStartTime",
    // args: [`${address}`],
  });

  // function 6
  const currUserID = useContractRead({
    abi,
    address: contract_address,
    functionName: "currUserID",
    // args: [`${address}`],
  });

  // function 9
  const globalPool = useContractRead({
    abi,
    address: contract_address,
    functionName: "globalPool",
    // args: [`${address}`],
  });

  // function 19
  const stakedUSDT = useContractRead({
    abi,
    address: contract_address,
    functionName: "stakedUSDT",
    args: [`${address}`],
  });

  // function 23
  const withdrawableROI = useContractRead({
    abi,
    address: contract_address,
    functionName: "withdrawableROI",
    args: [`${address}`],
  });

  const sliderData = [
    {
      value: parseInt(InsurancePoolActive.data) || 0,
      funName: "Insurance Pool Active",
    },
    {
      value: ethers.formatEther(KbcPrice.data) || 0,
      funName: "KBC Price",
    },
    {
      value: parseInt(currRound.data) || 0,
      funName: "currRound",
    },
    {
      value: dayjs(Number(currRoundStartTime.data) * 1000).format('DD-MMM-YYYY') || '00-Month-0000',
      funName: "currRoundStartTime",
    },
    {
      value: parseInt(currUserID.data) || 0,
      funName: "currUserID",
    },
    {
      value: ethers.formatEther(globalPool.data) || 0,
      funName: "Global Pool",
    },
    {
      value: parseInt(stakedUSDT.data) || 0,
      funName: "Staked USDT",
    },
    {
      value: parseInt(withdrawableROI.data) || 0,
      funName: "With Drawable ROI",
    }
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
            <SwiperSlide>
              <div className="card" key={i}>
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between flex-column h-100">
                    <h6 className="slide-number">
                      {e.value} 
                      {/* <span className="sub-title">KBC</span> */}
                    </h6>
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
