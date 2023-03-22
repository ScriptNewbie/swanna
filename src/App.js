import React, { useState } from "react";
import CookiesInfo from "./components/cookies";
import Appk from "./Main";
import Cookies from "js-cookie";

function App() {
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
