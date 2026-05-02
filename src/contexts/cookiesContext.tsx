import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

type CookiesContextType = {
  cookiesEnabled: boolean;
  setCookiesEnabled: (value: boolean) => void;
};

const CookiesContext = createContext<CookiesContextType | undefined>(
  undefined
);

export const CookiesProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookiesEnabled, setCookiesEnabled] = useState(
    Cookies.get("allowcookies") === "true"
  );

  return (
    <CookiesContext.Provider value={{ cookiesEnabled, setCookiesEnabled }}>
      {children}
    </CookiesContext.Provider>
  );
};

export const useCookiesContext = (): CookiesContextType => {
  const context = useContext(CookiesContext);
  if (context === undefined) {
    throw new Error("useCookiesContext must be used within a CookiesProvider");
  }
  return context;
};

export default CookiesContext;
