"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  const [city, setCity] = useState("");
  const router = useRouter();

  const redirectHandler = (e) => {
    e.preventDefault();
    router.push(`/query/${city}`);
  }

  return (
    <div className="flex justify-center ">

      <form className="flex justify-between items-center w-full rounded-xl bg-slate-800/70 backdrop-blur">

        <input type="text"
          placeholder="Cerca una città..."
          className="bg-transparent border-none focus:outline-none p-4 xl:p-7 flex-grow"
          onChange={(e) => setCity(e.target.value)} />

        <button className="p-5"
          onClick={(e) => redirectHandler(e)}>

          <FaSearch size={20} />
        </button>
      </form>
    </div>
  )
}

export default Searchbar