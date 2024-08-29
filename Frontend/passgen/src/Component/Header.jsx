import { useContext, useState } from "react";
import { ModeContext } from "../Context/Context";
import axiosInstance from "../Axios/axios";
import { errorToast, successToast } from "../Toast/toast";
import { useNavigate } from "react-router-dom";
import Model from "./Model";
import {
  faFloppyDisk,
  faL,
  faMoon,
  faRightFromBracket,
  faSun,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  const navigate = useNavigate();
  const { dark, setValue, setUser } = useContext(ModeContext);
  const [open, setOpen] = useState(false);
  const { user } = useContext(ModeContext);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const handleConfirm = () => {
    logout();
  };

  const handleDarkMode = () => {
    setValue(!dark);
  };

  const logout = async () => {
    try {
      const response = await axiosInstance.post("/api/logout");
      if (response.status == 200) {
        localStorage.removeItem("accesstoken");
        successToast(response.data.message);
        setOpen(false);
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      errorToast(error.response.data.message);
    }
  };
  return (
    <div className="py-3 px-3 flex  justify-between items-center ">
      <Model open={open} confirm={handleConfirm} onClose={closeModal}>
        <div className="mt-2">
          <p className="text-sm text-gray-500 dark:text-white">
            Are you sure you want to logout ?
          </p>
        </div>
      </Model>
      <div className="uppercase xs:text-base dark:text-white text-black font-semibold text-2xl ">
        Password Generator
      </div>
      <div className="flex gap-7 xs:gap-3 me-3 ">
        {user ? (
          <>
            <div
              onClick={openModal}
              className="  font-semibold  text-red-500 uppercase cursor-pointer"
            >
              <span className="xs:hidden"> logout</span>
              <span className="sm:hidden">
                {" "}
                <FontAwesomeIcon icon={faRightFromBracket} />
              </span>
            </div>
          </>
        ) : (
          <div
            onClick={() => navigate("/login")}
            className="  font-semibold  text-red-500 uppercase cursor-pointer"
          >
            <span className="xs:hidden"> login</span>
            <span className="sm:hidden">
              {" "}
              <FontAwesomeIcon icon={faUser} />
            </span>
          </div>
        )}

        <div
          onClick={() => (user ? navigate("/saved") : navigate("/login"))}
          className="  font-semibold dark:text-white text-black uppercase cursor-pointer"
        >
          <span className="xs:hidden">Saved</span>
          <span className="sm:hidden">
            {" "}
            <FontAwesomeIcon icon={faFloppyDisk} />
          </span>
        </div>
        <div
          onClick={handleDarkMode}
          className={`transition-all cursor-pointer text-[#000000]  font-semibold ${
            dark ? "dark:bg-white  px-4 py-1 rounded-lg" : ` `
          }`}
        >
          <span className="xs:hidden"> Dark</span>
          <span className="sm:hidden">
            {" "}
            <FontAwesomeIcon icon={faMoon} />
          </span>
        </div>

        <div
          onClick={handleDarkMode}
          className={`
            transition-all  cursor-pointer font-semibold
            ${!dark ? "bg-black  px-4 py-1  rounded-lg" : ""}
        
            `}
        >
          <span className="xs:hidden">Light</span>
          <span className="sm:hidden">
            {" "}
            <FontAwesomeIcon icon={faSun} />
          </span>
        </div>
      </div>
    </div>
  );
}
