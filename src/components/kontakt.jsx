import React, { useEffect, useRef } from "react";
import $ from "jquery";

function Kontakt({ setStyle }) {
  const loaded = useRef(false);
  const time = useRef(null);

  const showKapl = () => {
    if (loaded.current) {
      $("#map").css({ animation: "fadeout 400ms 1" });
      setTimeout(() => {
        $("#map").css({ animation: "fadein 300ms 1" });
        $("#kscl").css({ "z-index": 4 });
        $("#kapl").css({ "z-index": 5 });
      }, 200);
    } else {
      $("#kscl").css({ "z-index": 4 });
      $("#kapl").css({ "z-index": 5 });
    }
  };

  const showKscl = () => {
    if (loaded.current) {
      $("#map").css({ animation: "fadeout 400ms 1" });
      setTimeout(() => {
        $("#map").css({ animation: "fadein 300ms 1" });
        $("#kscl").css({ "z-index": 5 });
        $("#kapl").css({ "z-index": 4 });
      }, 200);
    } else {
      $("#kscl").css({ "z-index": 5 });
      $("#kapl").css({ "z-index": 4 });
    }
  };

  useEffect(() => {
    $("#tg").css({ "z-index": 3 });
    $("#kscl").css({ "z-index": 2 });
    $("#kapl").css({ "z-index": 1 });
    let height = $("#contactContent")[0].offsetHeight + 30;
    setStyle(740, height);
    $("#tg").on("load", () => {
      $("#map").css({ animation: "fadein 3s 1 2s" });
      time.current = setTimeout(() => {
        loaded.current = true;
        $("#map").css({ opacity: 1 });
      }, 4900);
    });

    return () => {
      clearTimeout(time.current);
    };
  }, []);

  return (
    <div id="contactContent">
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
              onClick={showKscl}
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
              onClick={showKapl}
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
          <div
            id="map"
            style={{
              position: "relative",
              height: "600px",
              marginTop: "15px",
              marginBottom: "-15px",
              opacity: 0,
            }}
          >
            <div
              id="mapwrap"
              style={{
                position: "absolute",
                border: 0,
                left: "-15px",
              }}
            >
              <iframe
                title={"tg" + Date.now().toString() + Math.random().toString()}
                id="tg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d81269.44827176395!2d18.77198715188062!3d50.46586470587073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471129ee71a16e17%3A0xd069d15a6f1c3f94!2sTarnowskie+G%C3%B3ry!5e0!3m2!1spl!2spl!4v1500586120424"
                frameBorder="0"
                style={{
                  position: "absolute",
                  width: "740px",
                  height: "600px",
                }}
              ></iframe>
              <iframe
                title={
                  "kscl" + Date.now().toString() + Math.random().toString()
                }
                id="kscl"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9833.1220241138!2d18.83755033754838!3d50.43553763422281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x57731b1c74e7bd22!2zS2_Fm2Npw7PFgiBwLncuIMWbdy4gQW5ueQ!5e0!3m2!1spl!2spl!4v1500573216123"
                frameBorder="0"
                style={{
                  position: "absolute",
                  width: "740px",
                  height: "600px",
                }}
              ></iframe>
              <iframe
                title={
                  "kapl" + Date.now().toString() + Math.random().toString()
                }
                id="kapl"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9679.660958362772!2d18.83830598088312!3d50.42819036350281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x65d19ba30a1ef36e!2sParafia+Rzymsko-katolicka+p.w.+%C5%9Bw.+Anny+-+Probostwo!5e0!3m2!1spl!2spl!4v1500590667015"
                frameBorder="0"
                style={{
                  position: "absolute",
                  width: "740px",
                  height: "600px",
                }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kontakt;
