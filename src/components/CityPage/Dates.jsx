"use client"

import { useEffect, useState } from "react"
import { tz } from "@/timezones/tz";

import { LuSunrise, LuSunset } from "react-icons/lu";


const Dates = ({ update, sunrise, sunset, shift }) => {
  const [timezone, setTimezone] = useState(0);
  const [dateFormatted, setDateFormatted] = useState(0);

  const timezoneHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("timezone", e.target.value);
    setTimezone(e.target.value);
  }

  const dateFormatter = (unix, toShift, shift) => {
    if (toShift) {
      unix = parseInt(unix) + parseInt(shift - 7200);
    }
    const date = new Date(unix * 1000);
    let hourFormatted = parseInt(date.getHours().toLocaleString("it")) + parseInt(timezone);
    if (hourFormatted >= 24) {
      hourFormatted -= 24;
    } else if (hourFormatted < 0) {
      hourFormatted += 24;
    }

    const hour = hourFormatted < 10 ? `0${hourFormatted}` : hourFormatted;
    const minutes = date.getMinutes().toLocaleString("it") < 10 ? `0${date.getMinutes().toLocaleString("it")}` : date.getMinutes().toLocaleString("it")
    return `${hour}:${minutes}`;
  }



  return (
    <div className="flex flex-col gap-5">
      <p className="text-center">{`ultimo aggiornamento: ${dateFormatter(update, false, shift)}`}</p>
      <div className="flex justify-between flex-col md:flex-row items-center">
        <div className="flex justify-evenly w-full items-center">
          <div className="flex flex-col items-center gap-5">
            <LuSunrise className="w-10 h-10" />
            <p className="text-[20px]">{`${dateFormatter(sunrise, true, shift)}`}</p>
          </div>
          <div className="flex flex-col items-center gap-5">
            <LuSunset className="w-10 h-10" />
            <p className="text-[20px]">{`${dateFormatter(sunset, true, shift)}`}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-center text-[0px] md:text-[17px] ">Fuso orario</p>
          <select name="" id="" onChange={(e) => timezoneHandler(e)} className="bg-black border rounded-xl p-3 max-w-[350px]">
            {tz.map((zone, i) => (
              <option key={`timezone-${i}`} value={`${zone.value}`} >{zone.label}</option>
            ))}

          </select>
        </div>
      </div>
    </div>
  )
}

export default Dates