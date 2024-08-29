import { useEffect, useState } from "react";
import Loading from "./Loading";
import Slider from "./Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faEye,
  faEyeSlash,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Axios/axios";
import Model from "./Model";
import { errorToast, successToast } from "../Toast/toast";
export default function Create() {
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);

  const [values, setData] = useState({
    length: 8,
    special: false,
    numbers: false,
    uppercase: false,
    symbols: false,
  });

  const [generatedPassword, setPass] = useState(null);
  const [view, setView] = useState(null);

  useEffect(() => {
    setView("*".repeat(generatedPassword?.length));
  }, [generatedPassword]);

  const [loading, setLoading] = useState(false);

  const generate = async () => {
    try {
      if (loading) {
        return;
      }
      setLoading(true);

      const response = await axiosInstance.post("/api/generate", values);

      if (response.status == 200) {
        setPass(response.data.password);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  function copy() {
    navigator.clipboard.writeText(generatedPassword.toString()).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }

  function hey(data) {
    setData((prev) => ({ ...prev, length: data }));
  }

  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const [error, setError] = useState("");
  const [desc, setDes] = useState("");

  const handleConfirm = () => {
    savePass();
  };

  async function savePass() {
    try {
      setError("");
      if (desc.trim().length == 0) {
        setError("field is required");
        return;
      }

      const response = await axiosInstance.post("/api/save-pass", {
        desc,
        pass: generatedPassword,
      });

      if (response.status == 200) {
        successToast(response.data.message);
        setOpen(false);
        setPass(null);
        setView(false);
      }
    } catch (error) {
      console.log(error);
      errorToast("");
    }
  }

  return (
    <div className="flex justify-center overflow-auto">
      <div style={{ scrollbarWidth: "none" }} className="overflow-auto ">
        <Model open={open} confirm={handleConfirm} onClose={closeModal}>
          <div className=" mb-2 w-full">
            <label
              htmlFor="first-name"
              className="block dark:text-white text-sm font-medium leading-6 text-gray-900"
            >
              Provide description
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setDes(e.target.value)}
                value={desc}
                type="text"
                autoComplete="given-name"
                className="block w-full 
              dark:bg-[#0d3c5f]
              dark:text-white text-black
              rounded-md  py-1.5
               border border-gray-800"
              />
            </div>
            <label className="text-sm text-red-500 ">{error && error}</label>
          </div>
        </Model>
        <div
          className=" space-y-6 w-[600px] xs:w-full xs:px-2 xs:mb-7
      "
        >
          <div className="sm:col-span-4">
            <label
              htmlFor="username"
              className="block text-lg dark:text-white text-sm font-medium leading-6 text-gray-900"
            >
              Your Password
            </label>
            <div className="mt-2">
              <div className="relative dark:bg-[#0d3c5f] bg-slate-200  h-24 rounded-lg flex justify-center  items-center">
                {!generatedPassword ? (
                  <span className="dark:text-slate-500 text-black ">
                    Your password displayed here
                  </span>
                ) : view == true ? (
                  <span className="text-xl dark:text-white text-black">
                    {generatedPassword}
                  </span>
                ) : (
                  <span className="text-xl dark:text-white text-black">
                    {view}
                  </span>
                )}

                {generatedPassword && (
                  <div className="flex gap-3 text-black dark:text-white  absolute bottom-2 right-2">
                    <div>
                      {view == true ? (
                        <FontAwesomeIcon
                          onClick={() =>
                            setView("*".repeat(generatedPassword?.length))
                          }
                          className="text-xl cursor-pointer"
                          icon={faEyeSlash}
                        />
                      ) : (
                        <FontAwesomeIcon
                          onClick={() => setView(true)}
                          className="text-xl cursor-pointer"
                          icon={faEye}
                        />
                      )}
                    </div>
                    <div>
                      <div className="icon-container" onClick={copy}>
                        <FontAwesomeIcon icon={faCopy} className="text-xl" />
                        {isCopied && (
                          <div className="copied-animation">Copied!</div>
                        )}
                      </div>
                    </div>
                    <div>
                      <FontAwesomeIcon
                        onClick={() =>
                          localStorage.getItem("accesstoken")
                            ? openModal()
                            : navigate("/login")
                        }
                        className="text-xl cursor-pointer"
                        icon={faFloppyDisk}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-lg dark:text-white text-sm font-medium leading-6 text-gray-900"
            >
              Password length
            </label>
            <Slider onSelect={hey} />
          </div>
          <label
            htmlFor="username"
            className="block text-lg dark:text-white text-sm font-medium leading-6 text-gray-900"
          >
            Settings
          </label>
          <div className="relative flex gap-x-3 dark:bg-[#0d3c5f] bg-slate-200 shadow-lg flex items-center justify-between py-2 px-4 rounded-lg">
            <div className="text-sm leading-6  ">
              <label
                htmlFor="comments"
                className="font-medium dark:text-white text-black text-base "
              >
                Special charecters
              </label>
              <p className="text-gray-500">
                Password will include special charecter #$%^&*
              </p>
            </div>
            <div className="flex h-6 items-center">
              <input
                onChange={() =>
                  setData((prev) => ({ ...prev, special: !values.special }))
                }
                id="comments"
                name="comments"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
          </div>
          <div className="relative flex gap-x-3 dark:bg-[#0d3c5f] bg-slate-200 shadow-lg flex items-center justify-between py-2 px-4 rounded-lg">
            <div className="text-sm leading-6  ">
              <label
                htmlFor="comments"
                className="font-medium dark:text-white text-black text-base "
              >
                Include uppercase
              </label>
              <p className="text-gray-500">
                Password will include uppercase charecters A-Z*
              </p>
            </div>
            <div className="flex h-6 items-center">
              <input
                onChange={() =>
                  setData((prev) => ({ ...prev, uppercase: !values.uppercase }))
                }
                id="comments"
                name="comments"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
          </div>
          <div className="relative flex gap-x-3 dark:bg-[#0d3c5f] bg-slate-200 shadow-lg flex items-center justify-between py-2 px-4 rounded-lg">
            <div className="text-sm leading-6  ">
              <label
                htmlFor="comments"
                className="font-medium dark:text-white text-black text-base "
              >
                Include symbols
              </label>
              <p className="text-gray-500">
                Password will include special charecter {"[]<>-+&"}
              </p>
            </div>
            <div className="flex h-6 items-center">
              <input
                onChange={() =>
                  setData((prev) => ({ ...prev, symbols: !values.symbols }))
                }
                id="comments"
                name="comments"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
          </div>
          <div className="relative flex gap-x-3 dark:bg-[#0d3c5f] bg-slate-200 shadow-lg flex items-center justify-between py-2 px-4 rounded-lg">
            <div className="text-sm leading-6  ">
              <label
                htmlFor="comments"
                className="font-medium dark:text-white text-black text-base "
              >
                Include Numbers
              </label>
              <p className="text-gray-500">
                Password will include numbers 1-10
              </p>
            </div>
            <div className="flex h-6 items-center">
              <input
                onChange={() =>
                  setData((prev) => ({ ...prev, numbers: !values.numbers }))
                }
                id="comments"
                name="comments"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
          </div>
          <div className=" flex justify-center">
            <button
              onClick={generate}
              className="min-w-40 min-h-9 flex items-center justify-center uppercase dark:bg-[#1e88d8] bg-[#000000] px-10 py-2 font-semibold rounded-lg text-sm"
            >
              {loading ? <Loading /> : "Generate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
