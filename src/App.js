import React, { useState, useEffect } from "react";
import CookiesInfo from "./components/cookies";
import Appk from "./Main";
import Cookies from "js-cookie";

function App() {
  useEffect(() => {
    document.getElementById("oldBrowserPrompt").style.display = "none";
  }, []);
  const [wasCookies, setWasCookies] = useState("no");
  return (
    <div key={wasCookies} className="quickfadein">
      {Cookies.get("allowcookies") === "true" ? (
        <Appk wasCookies={wasCookies} />
      ) : (
        <CookiesInfo setWasCookies={setWasCookies} />
      )}
    </div>
  );
}

export default App;
