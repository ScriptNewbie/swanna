import React, { useEffect } from "react";
import Link from "../Link";
import "./leftpanel.css";
import $ from "jquery";

function LeftPanel({ currentScreen }) {
  let currentClass = "";
  if (currentScreen === "ogloszenia") currentClass = "mszeHidden";
  else if (currentScreen === "historia") currentClass = "mszeHist";
  const showKosMap = () => {
    $("#kosMapContainer").css({
      display: "block",
      animation: "fadein 1s 1",
    });
  };

  const closeKosMap = () => {
    $("#kosMapContainer").css({ animation: "fadeout 1000ms 1" });
    setTimeout(() => {
      $("#kosMapContainer").css({ display: "none" });
    }, 500);
  };

  const showKapMap = () => {
    $("#kapMapContainer").css({
      display: "block",
      animation: "fadein 1s 1",
    });
  };

  const closeKapMap = () => {
    $("#kapMapContainer").css({ animation: "fadeout 1000ms 1" });
    setTimeout(() => {
      $("#kapMapContainer").css({ display: "none" });
    }, 500);
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
        <Link to="nabozenstwa">tutaj.</Link>**
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
      <div id="kosMapContainer">
        <iframe
          title="kosMap"
          id="kosMap"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9833.1220241138!2d18.83755033754838!3d50.43553763422281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x57731b1c74e7bd22!2zS2_Fm2Npw7PFgiBwLncuIMWbdy4gQW5ueQ!5e0!3m2!1spl!2spl!4v1500573216123"
          frameBorder="0"
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            height: "100%",
          }}
        ></iframe>
        <button
          style={{
            position: "fixed",
            top: "15px",
            right: "15px",
            cursor: "pointer",
          }}
          onClick={closeKosMap}
          type="button"
          className="btn btn-secondary"
        >
          Zamknij mapę
        </button>
      </div>
      <div id="kapMapContainer">
        <iframe
          title="kapMap"
          id="kapMap"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9679.660958362772!2d18.83830598088312!3d50.42819036350281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x65d19ba30a1ef36e!2sParafia+Rzymsko-katolicka+p.w.+%C5%9Bw.+Anny+-+Probostwo!5e0!3m2!1spl!2spl!4v1500590667015"
          frameBorder="0"
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            height: "100%",
          }}
        ></iframe>
        <button
          style={{
            position: "fixed",
            top: "15px",
            right: "15px",
            cursor: "pointer",
          }}
          onClick={closeKapMap}
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
