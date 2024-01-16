import React, { useEffect, useState } from "react";
import Link from "../Link";
import "./leftpanel.css";
import Map from "../map";

function LeftPanel({ currentScreen }) {
  const [mapVisible, setMapVisible] = useState("");
  const [mapClass, setMapClass] = useState("mapHidden");

  let currentClass = "";
  if (currentScreen === "ogloszenia") currentClass = "mszeHidden";
  else if (currentScreen === "historia") currentClass = "mszeHist";

  const showMap = () => {
    setMapClass("mapTransitioning");
    setTimeout(() => {
      setMapClass("mapVisible");
    }, 0);
  };

  const showKosMap = () => {
    setMapVisible("kscl");
    showMap();
  };

  const showKapMap = () => {
    setMapVisible("kapl");
    showMap();
  };

  const closeMap = () => {
    setMapClass("mapTransitioning");
    setTimeout(() => {
      setMapClass("mapHidden");
    }, 200);
  };

  useEffect(() => {
    var sticky = 190;
    var msze = document.getElementById("msze");
    function stick() {
      if (window.pageYOffset >= sticky) {
        msze.style.position = "fixed";
        msze.style.top = "20px";
      } else {
        msze.removeAttribute("style");
      }
    }
    document.addEventListener("scroll", stick, true /*Capture event*/);
  }, []);
  return (
    <div>
      <div id="msze" className={currentClass}>
        Msze święte w niedzielę:
        <br />
        <br />
        8:00 (<span onClick={showKapMap}>W kaplicy</span>)<br />
        10:00 (<span onClick={showKosMap}>W kościele</span>)<br />
        12:00 (<span onClick={showKosMap}>W kościele</span>)<br />
        <br />
        W tygodniu:
        <br />
        <br />
        Poniedziałek, środa i piątek
        <br />w <span onClick={showKosMap}>kościele</span> o godzinie 18:00.
        <br />
        Wtorek 7:30 (<span onClick={showKapMap}>Kaplica</span>)<br />
        Czwartek 17:00 (<span onClick={showKapMap}>Kaplica</span>)*
        <br />
        <br />
        Pełny porządek nabożeństw znajduje się{" "}
        <Link to="/nabozenstwa">tutaj.</Link>**
        <br />
        <br />
        Kancelaria <br />
        <small>
          (<span onClick={showKapMap}>ul. Torowa 45</span>)
        </small>
        <br />
        Poniedziałek 12:00 - 15:00
        <br />
        Piątek 15:00 - 17:00
        <br />
        <small>
          <small>
            *W okresie wakacyjnym msze święte w Kościele o godzinie 18:00.
            <br />
            **Może zdarzyć się, że msze święte będą odprawiane w innych niż
            podane tutaj godziny, dlatego warto upewnić się i zajrzeć do
            ogłoszeń parafialnych.
          </small>
        </small>
        <br />
      </div>
      <div className={"mapContainer " + mapClass}>
        <Map
          className="leftPanelMap"
          key={mapVisible}
          map={mapVisible}
          onNavigateToPolicy={closeMap}
        />
        <button
          style={{
            position: "fixed",
            top: "15px",
            right: "15px",
            cursor: "pointer",
          }}
          onClick={closeMap}
          type="button"
          className="btn btn-secondary"
        >
          Zamknij mapę
        </button>
      </div>
    </div>
  );
}

export default LeftPanel;
