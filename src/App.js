import React, { useState, useEffect } from "react";
import CookiesInfo from "./components/cookies";
import Appk from "./Main";
import Cookies from "js-cookie";
import { FadeTransitionProvider } from "./contexts/fadeTransitionContext";

function App() {
  useEffect(() => {
    document.getElementById("oldBrowserPrompt").style.display = "none";
  }, []);
  const [wasCookies, setWasCookies] = useState("no");
  return (
    <FadeTransitionProvider>
      <div key={wasCookies} className="quickfadein">
        {Cookies.get("allowcookies") === "true" ? (
          <Appk wasCookies={wasCookies} />
        ) : (
          <CookiesInfo setWasCookies={setWasCookies} />
        )}
      </div>
    </FadeTransitionProvider>
  );
}

export default App;
