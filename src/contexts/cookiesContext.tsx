import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const COOKIE_KEY = "allowcookies";
const COOKIE_EXPIRY = 399;

type CookiesContextType = {
  cookiesEnabled: boolean;
  acceptCookies: () => void;
  rejectCookies: () => void;
  refreshCookiesExpiry: () => void;
};

const CookiesContext = createContext<CookiesContextType | undefined>(undefined);

export const CookiesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cookiesEnabled, setCookiesEnabled] = useState(
    Cookies.get(COOKIE_KEY) === "true",
  );

  const acceptCookies = () => {
    Cookies.set(COOKIE_KEY, "true", { expires: COOKIE_EXPIRY, path: "/" });
    setCookiesEnabled(true);
  };

  const rejectCookies = () => {
    Cookies.remove(COOKIE_KEY, { path: "/" });
    setCookiesEnabled(false);
  };

  const refreshCookiesExpiry = () => {
    const currentValue = Cookies.get(COOKIE_KEY);
    if (currentValue !== "true") return;
    Cookies.set(COOKIE_KEY, "true", {
      expires: COOKIE_EXPIRY,
      path: "/",
    });
  };

  return (
    <CookiesContext.Provider
      value={{
        cookiesEnabled,
        acceptCookies,
        rejectCookies,
        refreshCookiesExpiry,
      }}
    >
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
