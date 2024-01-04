import React, { useContext } from "react";
import CookiesContext from "../../contexts/cookiesContext";
import Cookies from "js-cookie";

function CookiesAcceptButton() {
  const { setCookiesEnabled } = useContext(CookiesContext);
  return (
    <button
      onClick={() => {
        Cookies.set("allowcookies", "true", {
          expires: 399,
          path: "/",
        });
        setCookiesEnabled(true);
      }}
      className="btn btn-success"
    >
      Akceptuję pliki cookies!
    </button>
  );
}

export default CookiesAcceptButton;
