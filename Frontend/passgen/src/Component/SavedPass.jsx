import {
  faCopy,
  faEye,
  faEyeSlash,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import Loading, { Loading2 } from "./Loading";
import { ModeContext } from "../Context/Context";
import axiosInstance from "../Axios/axios";
import { errorToast, successToast } from "../Toast/toast";

export default function SavedPass() {
  const [passwords, setPasswords] = useState([]);

  const [map, setMap] = useState([]);
  const [loading, setLoading] = useState(true);

  const { dark } = useContext(ModeContext);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    async function getPassword() {
      try {
        const response = await axiosInstance.get("/api/saved-pass");
        if (response.status == 200) {
          setPasswords(response.data.passwords);
          setMap(response?.data?.map);
          setIsCopied(response?.data?.map);
        }
      } catch (error) {
        console.log(error);
        errorToast(error.response.data.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    getPassword();
  }, []);

  async function deletePass(id) {
    try {
      const response = await axiosInstance.patch("/api/delete-pass", { id });
      if (response.status == 200) {
        successToast(response.data.message);
        setPasswords((prev) => prev.filter((val) => val._id !== id));
      }
    } catch (error) {
      errorToast(error.response.data.message);
    }
  }
  return (
    <div
      style={{ scrollbarWidth: "none" }}
      className="flex mb-6 overflow-auto mt-4 grow  justify-center h-"
    >
      {loading ? (
        dark ? (
          <Loading />
        ) : (
          <Loading2 />
        )
      ) : (
        <div className="w-[600px] flex-col xs:w-full xs:px-2 xs:mb-7">
          {passwords.length ? (
            passwords.map((val, index) => (
              <div
                key={index}
                className="relative mt-2 dark:bg-[#0d3c5f] bg-slate-200  h-24 rounded-lg  px-5 py-2 w-[600px] xs:w-full"
              >
                <div className="dark:text-white text-black">{val.des}</div>

                <div className="mt-2 text-xl xs:text-lg dark:text-white text-black truncate">
                  {map[val._id] ? val.password : "*****"}
                </div>
                <div className="flex gap-4 text-black dark:text-white  absolute bottom-2 right-2">
                  <div>
                    {map[val._id] ? (
                      <FontAwesomeIcon
                        onClick={() =>
                          setMap((prev) => ({ ...prev, [val._id]: false }))
                        }
                        className="text-xl xs:text-base cursor-pointer"
                        icon={faEyeSlash}
                      />
                    ) : (
                      <FontAwesomeIcon
                        onClick={() =>
                          setMap((prev) => ({ ...prev, [val._id]: true }))
                        }
                        className="text-xl xs:text-base cursor-pointer"
                        icon={faEye}
                      />
                    )}
                  </div>
                  <div>
                    <div
                      className="icon-container"
                      onClick={() =>
                        navigator.clipboard.writeText(val.password).then(() => {
                          setIsCopied((prev) => ({ ...prev, [val._id]: true }));
                          setTimeout(
                            () =>
                              setIsCopied((prev) => ({
                                ...prev,
                                [val._id]: false,
                              })),
                            2000
                          );
                        })
                      }
                    >
                      <FontAwesomeIcon icon={faCopy} className="text-xl" />
                      {isCopied[val._id] && (
                        <div className="copied-animation">Copied!</div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="icon-container">
                      <FontAwesomeIcon
                        onClick={() => deletePass(val._id)}
                        icon={faTrash}
                        className="text-xl xs:text-base text-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="relative dark:bg-[#0d3c5f] bg-slate-200 flex justify-center items-center  h-24 rounded-lg  px-5 py-2 w-[600px]">
              No passwords saved
            </div>
          )}
        </div>
      )}
    </div>
  );
}
