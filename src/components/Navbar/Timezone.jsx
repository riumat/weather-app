"use client"
import { tz } from "@/timezones/tz";

const timezoneHandler = (e) => {
  e.preventDefault();
  localStorage.setItem("timezone", e.target.value);
  setTz(e.target.value);
}

const Timezone = ({setTz}) => {
  return (
    <select name="" id="" onChange={(e) => timezoneHandler(e)}>
      {tz.map((zone, i) => (
        <option key={`timezone-${i}`} value={`${zone.value}`} >{zone.label}</option>
      ))}

    </select>
  )
}

export default Timezone

