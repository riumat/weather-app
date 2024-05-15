"use client"
import Image from "next/image"
import { useRouter } from "next/navigation";

import { FaTemperatureEmpty, FaDroplet, FaWind } from "react-icons/fa6";

const CityCard = ({ data }) => {
  const router = useRouter();
  return (
    <div
      className="flex w-[300px] xl:w-[450px] justify-between items-center rounded-xl bg-slate-800/70 backdrop-blur p-5 xl:p-8 cursor-pointer"
      onClick={() => router.push(`/city?lat=${data?.coord.lat}&lon=${data?.coord.lon}&name=${data?.name}`)}
    >


      <div className="flex flex-col justify-between">

        <p className="text-[26px] xl:text-[35px] font-semibold">{data?.name}</p>

        <div className="flex items-center gap-3 xl:gap-5">
          <p className="text-[15px] xl:text-[18px]">{data?.weather[0].description}</p>
          <div className="relative w-[40px] h-[40px] xl:w-[50px] xl:h-[50px]">
            <Image src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`} alt="" fill={true} sizes="100vw" className="image" />
          </div>
        </div>

      </div>
      <div className="flex flex-col gap-3 xl:gap-5">

        <div className="flex items-center gap-3 xl:gap-5 text-[14px] xl:text-[16px]">
          <FaTemperatureEmpty className="w-[15px] h-[15px] xl:w-[20px] xl:h-[20px]" />
          <p>{data?.main.temp.toFixed(1)}°</p>
        </div>

        <div className="flex items-center gap-3 xl:gap-5 text-[14px] xl:text-[16px]">
          <FaDroplet className="w-[15px] h-[15px] xl:w-[20px] xl:h-[20px]" />
          <p>{data?.main.humidity}%</p>
        </div>

        <div className="flex items-center gap-3 xl:gap-5 text-[14px] xl:text-[16px]">
          <FaWind className="w-[15px] h-[15px] xl:w-[20px] xl:h-[20px]" />
          <p>{data?.wind.speed} km/h</p>
        </div>
      </div>
    </div>
  )
}

export default CityCard