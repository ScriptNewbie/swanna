import React from "react";
import Cookies from "js-cookie";
import { useCookiesContext } from "../../contexts/cookiesContext";

function CookiesRejectButton() {
  const { setCookiesEnabled } = useCookiesContext();
  return (
    <button
      onClick={() => {
        Cookies.remove("allowcookies", {
          path: "/",
        });
        setCookiesEnabled(false);
      }}
      className="btn btn-danger"
    >
      Nie akceptuję plików cookies!
    </button>
  );
}

export default CookiesRejectButton;
