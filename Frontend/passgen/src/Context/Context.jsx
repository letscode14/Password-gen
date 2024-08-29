import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../Axios/axios";

export const ModeContext = createContext(null);

const ModeProvider = ({ children }) => {
  const [dark, setValue] = useState(true);

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fectuser() {
      try {
        const response = await axiosInstance.get("/api/user");
        if (response.status == 200) {
          setUser(response.data.email);
        }
      } catch (error) {
        console.log(error);
        setUser(null);
      }
    }
    if (localStorage.getItem("accesstoken")) {
      fectuser();
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    if (!dark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [dark]);

  return (
    <ModeContext.Provider value={{ dark, setValue, user, setUser }}>
      {children}
    </ModeContext.Provider>
  );
};

export default ModeProvider;
