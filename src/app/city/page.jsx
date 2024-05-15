import Image from "next/image";

import { FaDroplet, FaWind, FaCompass, FaTemperatureArrowUp, FaTemperatureArrowDown, FaCloud } from "react-icons/fa6";
import { LuSunrise, LuSunset } from "react-icons/lu";

const dateFormatter = (unix, shift, toShift) => {
  if (toShift) {  
    unix = parseInt(unix) + parseInt(shift - 7200);
  }
  const date = new Date(unix * 1000);
  const hour = date.getHours().toLocaleString("it") < 10 ? `0${date.getHours().toLocaleString("it")}` : date.getHours().toLocaleString("it");
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
  const data = await getData(searchParams.lat, searchParams.lon);
  const name = searchParams.name;

  console.log(data);

  return (
    <div className="flex justify-between  rounded-xl bg-slate-800/70 backdrop-blur p-5">
      <div className="flex flex-col gap-5">

        <p className="text-[35px] ">{name}</p>
        <p> {`ultima misurazione alle ${dateFormatter(data?.dt, data?.timezone, false)}`}</p>

        <p className="text-[55px] font-semibold">{data?.main.temp.toFixed(1)}°</p>

        <div>
          <LuSunrise />
          <p>{`${dateFormatter(data?.sys.sunrise, data?.timezone, true)}`}</p>
        </div>
        <div>
          <LuSunset />
          <p>{`${dateFormatter(data?.sys.sunset, data?.timezone, true)}`}</p>
        </div>

        <p>{`temperatura percepita ${data?.main.feels_like.toFixed(1)}°`}</p>

        <div>
          <FaTemperatureArrowUp />
          <p>{`${data?.main.temp_max.toFixed(1)}°`}</p>
        </div>
        <div>
          <FaTemperatureArrowDown />
          <p>{`${data?.main.temp_min.toFixed(1)}°`}</p>
        </div>
        <div>
          <FaDroplet />
          <p>{`umidità ${data?.main.humidity}%`}</p>
        </div>
        <div>
          <FaWind />
          <p>{`velocità vento ${data?.wind.speed} km/h`}</p>
        </div>
        <div>
          <FaCompass />
          <p>{`direzione vento ${windFormatter(data?.wind.deg)}`}</p>
        </div>
        <div>
          <FaCloud />
          <p>{`nuvolosità ${data?.clouds.all}%`}</p>
        </div>

        <div className="flex items-center">
          <p className="text-[15px] xl:text-[18px]">{data?.weather[0].description}</p>
          <div className="relative w-[40px] h-[40px] xl:w-[50px] xl:h-[50px]">
            <Image src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`} alt="" fill={true} sizes="100vw" className="image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CityPage;