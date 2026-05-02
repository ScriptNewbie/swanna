import React from "react";
import { useCookiesContext } from "../../contexts/cookiesContext";

function CookiesAcceptButton() {
  const { acceptCookies } = useCookiesContext();
  return (
    <button onClick={acceptCookies} className="btn btn-success">
      Akceptuję pliki cookies!
    </button>
  );
}

export default CookiesAcceptButton;
