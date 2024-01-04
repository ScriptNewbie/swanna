import React, { useContext, useEffect, useRef } from "react";
import CookiesContext from "../../contexts/cookiesContext";
import CookiesAcceptButton from "./CookiesAcceptButton";
import CookiesRejectButton from "./CookiesRejectButton";

function Cookies({ setCurrentScreen, adjustHeight }) {
  const { cookiesEnabled } = useContext(CookiesContext);
  const content = useRef(null);
  const handleResize = () => {
    adjustHeight(content.current.scrollHeight);
  };

  useEffect(() => {
    setCurrentScreen("cookies");
    adjustHeight(content.current.scrollHeight);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id="cookiesContent" className="center" ref={content}>
      <div style={{ fontSize: "3rem", textAlign: "center", marginBottom: 10 }}>
        Pliki Cookies
      </div>
      Zgodnie z obowiązującym prawem, jesteśmy zobowiązani do poproszenia Cię o
      zgodę na zapisywanie w Twojej przeglądarce tak zwanych plików cookies
      (ciasteczek) oraz odczytywanie ich. <br /> <br />
      Nasza strona nie wykorzystuje ciasteczek do zbierania jakichkolwiek
      informacji o tobie, a jedynie do przechowywania twoich preferencji
      (wyrażenie zgody na przechowywanie Ciasteczek, pamiętanie zamknięcia
      wyskakujących komunikatów, itp.).
      <br /> <br />
      <div>
        Jeżeli wyrazisz na to zgodę, nasza strona ładuje jednak zawartość stron
        trzecich takich jak <a href="https://google.com">Google (mapy)</a> czy{" "}
        <a href="https:/onesignal.com">OneSignal (obsługa wiadomości push)</a>
        , która może zapisywać i wykorzystywać ciasteczka lub inne mechanizmy do
        gromadzenia informacji o twoim urządzeniu lub tobie (zgodnie z polityką
        prywatności wcześniej wspomnianych podmiotów).
        <br /> <br />
        Jeżeli nie wyrazisz zgody na ciasteczka, niektóre funkcje strony nie
        będą dostępne. <br />
        <br /> Aktualnie{" "}
        {cookiesEnabled ? (
          <span className="text-success">wyrażasz zgodę</span>
        ) : (
          <span className="text-danger">nie wyrażasz zgody</span>
        )}{" "}
        na zapis ciasteczek!
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          {cookiesEnabled ? <CookiesRejectButton /> : <CookiesAcceptButton />}
        </div>
      </div>
      <br />
    </div>
  );
}

export default Cookies;
