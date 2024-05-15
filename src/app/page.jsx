
import CityCard from "@/components/Home/CityCard";
import Searchbar from "@/components/Searchbar/Searchbar";



const getData = async () => {

  const ny = `https://api.openweathermap.org/data/2.5/weather?q=new york&lang=it&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
  const london = `https://api.openweathermap.org/data/2.5/weather?q=london&lang=it&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
  const moscow = `https://api.openweathermap.org/data/2.5/weather?q=moscow&lang=it&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const [resNy, resLondon, resBejing] = await Promise.all([
    fetch(ny),
    fetch(london),
    fetch(moscow)
  ]);

  if (!resNy.ok || !resLondon.ok || !resBejing.ok) {

    throw new Error("failed to fetch");
  }

  const nyData = await resNy.json();
  const londonData = await resLondon.json();
  const moscowData = await resBejing.json();

  return [nyData, londonData, moscowData];
}




const Home = async () => {
  const data = await getData();



  return (
    <div className="flex-grow flex flex-col justify-evenly">
      <Searchbar/>
      <div className="flex flex-col items-center gap-10 lg:gap-0 lg:flex-row justify-between">
        {data.map((city, i) => (
          <CityCard data={city} key={`city-${i}`} />
        ))}
      </div>
    </div>
  )
}

export default Home