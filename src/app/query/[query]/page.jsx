"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const QueryPage = ({ params }) => {
  const router = useRouter();
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true)
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${params?.query}&limit=5&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;


  useEffect(() => {
    fetch(url, { next: { revalidate: 300 } })
      .then(res => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
  }, [])

  if (isLoading) return <p>Caricamento...</p>
  if (!data) return <p>Nessuna città.</p>

  return (
    <div className="flex flex-col gap-7 flex-grow justify-center">
      {data.map((city, i) => (
        <div
          key={`query-${i}`}
          className="grid grid-cols-3  p-5 items-center  rounded-xl bg-slate-800/70 backdrop-blur cursor-pointer"
          onClick={() => router.push(`/city?lat=${city?.lat}&lon=${city?.lon}&name=${city?.local_names?.it ? city?.local_names?.it : city?.name}`)}>

          <p className="text-[18px] font-semibold">{city?.local_names?.it ? city?.local_names?.it : city?.name}</p>
          <p className="text-[16px]">Nazione: {city?.country}</p>
          <p className="text-[16px]">Regione: {city?.state}</p>
        </div>
      ))}
    </div>
  )
}

export default QueryPage;