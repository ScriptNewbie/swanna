import React, { useState, useEffect } from "react";
import CookiesInfo from "./components/cookies";
import Appk from "./Main";
import Cookies from "js-cookie";
import { TransitionProvider } from "./contexts/TransitionContext";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function App() {
  useEffect(() => {
    document.getElementById("oldBrowserPrompt").style.display = "none";
  }, []);
  const [wasCookies, setWasCookies] = useState("no");
  return (
    <TransitionProvider>
      <div key={wasCookies} className="quickfadein">
        {Cookies.get("allowcookies") === "true" ? (
          <Appk wasCookies={wasCookies} />
        ) : (
          <CookiesInfo setWasCookies={setWasCookies} />
        )}
      </div>
    </TransitionProvider>
  );
}

export default App;
