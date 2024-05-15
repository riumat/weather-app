import Date from "./LocalDate"
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-7 py-4 my-5  rounded-xl bg-slate-800/70 backdrop-blur">
      <Date />
      <FaGithub className="h-5 w-5" fill="white"/>
    </div>
  )
}

export default Navbar