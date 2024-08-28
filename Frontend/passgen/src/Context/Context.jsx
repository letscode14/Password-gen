import React, { createContext, useContext, useEffect, useState } from "react";

export const ModeContext = createContext(null);

const ModeProvider = ({ children }) => {
  const [dark, setValue] = useState(true);

  useEffect(() => {
    if (!dark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [dark]);

  return (
    <ModeContext.Provider value={{ dark, setValue }}>
      {children}
    </ModeContext.Provider>
  );
};

export default ModeProvider;
