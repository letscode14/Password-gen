import { useContext } from "react";
import { ModeContext } from "../Context/Context";

export default function Header() {
  const { dark, setValue } = useContext(ModeContext);

  const handleDarkMode = () => {
    setValue(!dark);
  };
  return (
    <div className="bg-[] py-3 px-3 flex justify-between items-center ">
      <div className="uppercase dark:text-white text-black font-semibold text-2xl ">
        Password Generator
      </div>
      <div className="flex gap-5 me-3 ">
        <div
          onClick={handleDarkMode}
          className={`transition-all cursor-pointer text-[#000000]  font-semibold ${
            dark ? "dark:bg-white  px-4 py-1 rounded-lg" : ` `
          }`}
        >
          Dark mode
        </div>

        <div
          onClick={handleDarkMode}
          className={`
            transition-all  cursor-pointer font-semibold
            ${!dark ? "bg-black  px-4 py-1  rounded-lg" : ""}
        
            `}
        >
          Light mode
        </div>
      </div>
    </div>
  );
}
