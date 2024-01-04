import React, { useContext } from "react";
import CookiesContext from "../../contexts/cookiesContext";
import Cookies from "js-cookie";

function CookiesRejectButton() {
  const { setCookiesEnabled } = useContext(CookiesContext);
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
