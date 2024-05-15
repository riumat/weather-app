import Dates from "@/components/CityPage/Dates";
import Image from "next/image";

import { FaDroplet, FaWind, FaCompass, FaTemperatureArrowUp, FaTemperatureArrowDown, FaCloud } from "react-icons/fa6";

const dateFormatter = (unix, shift, userTz, toShift) => {
  if (toShift) {
    unix = parseInt(unix) + parseInt(shift - 7200);
  }
  const date = new Date(unix * 1000);

  let hourFormatted = parseInt(date.getHours().toLocaleString("it")) + parseInt(userTz);
  if (hourFormatted >= 24) {
    hourFormatted = -24;
  } else if (hourFormatted < 0) {
    hourFormatted = 24 - hourFormatted;
  }

  const hour = hourFormatted < 10 ? `0${hourFormatted}` : hourFormatted;

  const minutes = date.getMinutes().toLocaleString("it") < 10 ? `0${date.getMinutes().toLocaleString("it")}` : date.getMinutes().toLocaleString("it")
  return `${hour}:${minutes}`;
}

const windFormatter = (angle) => {
  const directions = ['↓ Nord', '↙ Nord Est', '← Est', '↖ Sud Est', '↑ Sud', '↗ Sud Ovest', '→ Ovest', '↘ Nord Ovest'];
  return directions[Math.round(angle / 45) % 8];
}

const getData = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=it&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) {
    throw new Error("failed to fetch");
  }
  return await res.json();
}
const CityPage = async ({ searchParams }) => {
  let userTz = 0;


  const data = await getData(searchParams.lat, searchParams.lon);
  const name = searchParams.name;


  return (

    <div className="flex flex-col gap-5 ">
      <div className="rounded-xl bg-black/35 backdrop-blur p-5">
        <p className="text-[20px] md:text-[35px] ">{name}</p>

        <div className="flex flex-col md:flex-row gap-10 items-center">
          <p className="text-[60px] font-semibold">{data?.main.temp.toFixed(1)}°<span className="font-thin text-slate-300">{` / ${data?.main.feels_like.toFixed(1)}°`}</span></p>
          <div className="flex gap-5 items-center">
            <div className="flex items-center gap-5">
              <div className="flex flex-col items-center gap-2">
                <FaTemperatureArrowUp className="w-6 h-6" />
                <p className="text-[20px]">{`${data?.main.temp_max.toFixed(1)}°`}</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <FaTemperatureArrowDown className="w-6 h-6" />
                <p className="text-[20px]">{`${data?.main.temp_min.toFixed(1)}°`}</p>
              </div>

            </div>

          </div>
          <p className="text-[20px] xl:text-[30px]">{`${data?.weather[0].description}`}</p>
        </div>
      </div>

      <div className="flex flex-col 2xl:flex-row gap-5">
        <div className="rounded-xl bg-black/35 backdrop-blur p-5 flex items-center justify-between text-[20px] md:text-[30px] flex-1">
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 items-center">
            <FaDroplet className="w-6 h-6 md:w-10 md:h-10" />
            <p >{`${data?.main.humidity}%`}</p>
          </div>
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 items-center">
            <FaCloud className="w-6 h-6 md:w-10 md:h-10" />
            <p >{`${data?.clouds.all}%`}</p>
          </div>
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 items-center">
            <FaWind className="w-6 h-6 md:w-10 md:h-10" />
            <p className="text-[14px] md:text-[20px]">{` ${data?.wind.speed} km/h`}</p>
          </div>
          <div className="flex flex-col md:flex-row gap-3 md:gap-5 items-center">
            <FaCompass className="w-6 h-6 md:w-10 md:h-10" />
            <p className="text-[14px] md:text-[20px]">{`${windFormatter(data?.wind.deg)}`}</p>
          </div>
        </div>

        <div className="rounded-xl bg-black/35 backdrop-blur p-5 flex-1">
          <Dates update={data?.dt} sunrise={data?.sys.sunrise} sunset={data?.sys.sunset} shift={data?.timezone} />
        </div>

      </div>
      
    </div>
  );
}

export default CityPage;