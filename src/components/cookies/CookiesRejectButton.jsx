import React from "react";
import { useCookiesContext } from "../../contexts/cookiesContext";

function CookiesRejectButton() {
  const { rejectCookies } = useCookiesContext();
  return (
    <button onClick={rejectCookies} className="btn btn-danger">
      Nie akceptuję plików cookies!
    </button>
  );
}

export default CookiesRejectButton;
