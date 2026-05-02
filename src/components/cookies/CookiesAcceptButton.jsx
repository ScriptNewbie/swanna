import React from "react";
import Cookies from "js-cookie";
import { useCookiesContext } from "../../contexts/cookiesContext";

function CookiesAcceptButton() {
  const { setCookiesEnabled } = useCookiesContext();
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
