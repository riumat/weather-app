"use client"

import { useRouter } from "next/navigation";

const getData = async (query) => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) {
    throw new Error("failed to fetch");
  }
  return await res.json();
}

const searchHandle = (lat, lon) => {

}

const QueryPage = async ({ params }) => {
  const router = useRouter();
  const data = await getData(params?.query);

  return (
    <div className="flex flex-col gap-7 flex-grow justify-center">
      {data.map((city, i) => (
        <div
          key={`query-${i}`}
          className="grid grid-cols-3  p-5 items-center  rounded-xl bg-slate-800/70 backdrop-blur cursor-pointer"
          onClick={() => router.push(`/city?lat=${city.lat}&lon=${city.lon}&name=${city.local_names.it ? city.local_names.it : city.name}`)}>

          <p className="text-[18px] font-semibold">{city?.local_names?.it ? city?.local_names?.it : city?.name}</p>
          <p className="text-[16px]">Nazione: {city?.country}</p>
          <p className="text-[16px]">Regione: {city?.state}</p>
        </div>
      ))}
    </div>
  )
}

export default QueryPage;