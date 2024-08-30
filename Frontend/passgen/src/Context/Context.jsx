import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../Axios/axios";

export const ModeContext = createContext(null);

const ModeProvider = ({ children }) => {
  const [dark, setValue] = useState();
  useEffect(() => {
    const value = localStorage.getItem("mode");
    if (value == "true") {
      setValue(true);
    } else if (value == "false") {
      setValue(false);
    } else {
      setValue(true);
    }
  }, []);

  const [load, setLoading] = useState(true);

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fectuser() {
      try {
        const response = await axiosInstance.get("/api/user");
        if (response.status == 200) {
          setUser(response.data.email);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setUser(null);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    fectuser();
  }, []);

  useEffect(() => {
    if (!dark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [dark]);

  return (
    <ModeContext.Provider value={{ dark, setValue, user, setUser, load }}>
      {children}
    </ModeContext.Provider>
  );
};

export default ModeProvider;
