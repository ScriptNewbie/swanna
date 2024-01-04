import React from "react";
import Cookies from "js-cookie";

const CookiesContext = React.createContext();

export const CookiesProvider = ({ children }) => {
  const [cookiesEnabled, setCookiesEnabled] = React.useState(
    Cookies.get("allowcookies") === "true"
  );

  return (
    <CookiesContext.Provider value={{ cookiesEnabled, setCookiesEnabled }}>
      {children}
    </CookiesContext.Provider>
  );
};

export default CookiesContext;
