import React, { useEffect, useState, useRef } from "react";
import Map from "../map";
import Link from "../Link";
import "./kontakt.css";

function Kontakt({ setCurrentScreen, adjustHeight }) {
  const content = useRef(null);
  const [currentMap, setCurrentMap] = useState("tg");

  const handleResize = () => {
    adjustHeight(content.current.scrollHeight);
  };

  useEffect(() => {
    setCurrentScreen("kontakt");
    adjustHeight(content.current.scrollHeight);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div id="contactContent" className="center" ref={content}>
      <div className="grid-container">
        <div className="leftHeader">
          <b>Adres kościoła pw. Świętej Anny:</b>
        </div>
        <div className="rightHeader">
          <b>Adres probostwa, kancelarii oraz kaplicy pw. Świętej Jadwigi:</b>
        </div>

        <div className="leftAddress">
          ul. Gliwicka
          <br />
          42-600 Tarnowskie Góry
          <br />
          kontakt@swanna.net.pl
        </div>
        <div className="rightAddress">
          ul. Torowa 45 <br /> 42-600 Tarnowskie Góry <br /> +48 32 285 85 47
        </div>

        <div className="leftAdditional">
          <b>Numer konta bankowego:</b> <br /> PL 42 1050 1230 1000 0090 3256
          7647
          <br />
          <b>Standardy ochrony dzieci:</b> <br /> Znajdują się{" "}
          <Link to="/pdf/standardy.v1.pdf"> pod tym adresem.</Link>
        </div>
        <div className="rightAdditional">
          <b>Godziny pracy kancelarii:</b>
          <br />
          Poniedziałek 12:00 - 15:00
          <br />
          Piątek 15:00 - 17:00
        </div>

        <div className="leftButton">
          <center>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ marginTop: "10px" }}
              onClick={() => {
                setCurrentMap("kscl");
              }}
            >
              Pokaż na mapie
            </button>
          </center>
        </div>
        <div className="rightButton">
          <center>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ marginTop: "10px" }}
              onClick={() => {
                setCurrentMap("kapl");
              }}
            >
              Pokaż na mapie
            </button>
          </center>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="ldr">
            <center>
              <div className="spinner-border text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </center>
          </div>
          <div id="map">
            <div id="mapwrap">
              <Map className="googleMap" map={currentMap} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kontakt;
