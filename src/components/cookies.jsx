import React, { useEffect } from "react";
import Cookies from "js-cookie";

function CookiesInfo({ setWasCookies }) {
  const accept = () => {
    Cookies.set("allowcookies", "true", {
      expires: 399,
      path: "/",
    });
    document.getElementById("cookiesWholePage").classList.add("fadeout");
    setTimeout(() => {
      setWasCookies("yes");
    }, 200);
  };

  useEffect(() => {
    document.getElementById("oldBrowserPrompt").style.display = "none";
  });
  return (
    <div
      id="cookiesWholePage"
      style={{
        position: "absolute",
        width: "100%",
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "85%",
          margin: 20,
          backgroundColor: "#3f4d7f",
          borderRadius: 40,
          color: "white",
          padding: 40,
        }}
      >
        <div
          style={{ fontSize: "3rem", textAlign: "center", marginBottom: 10 }}
        >
          Pliki Cookies
        </div>
        <div style={{ textAlign: "center" }}>
          <a
            style={{ marginBottom: 15, minWidth: 180 }}
            href="#decline"
            type="button"
            className="btn btn-secondary"
          >
            Przewiń na koniec!
          </a>
        </div>
        <div style={{ textAlign: "justify" }}>
          Zgodnie z obowiązującym prawem, jesteśmy obowiązani do poproszenia Cię
          o zgodę na zapisywanie w Twojej przeglądarce tak zwanych plików
          cookies (ciasteczek) oraz odczytywanie ich. <br /> <br />
          Nasza strona nie wykorzystuje ciasteczek do zbierania jakichkolwiek
          informacji o tobie, a jedynie do przechowywania twoich preferencji
          (wyrażenie zgody na przechowywanie Ciasteczek, pamiętanie zamknięcia
          wyskakujących komunikatów, itd.).
          <br /> <br />
          <div>
            Jeżeli wyrazisz na to zgodę, nasza strona ładuje jednak zawartość
            stron trzecich takich jak{" "}
            <a style={{ color: "gold" }} href="https://google.com">
              Google (mapy, czytnik plików PDF dla ogłoszeń)
            </a>{" "}
            czy{" "}
            <a style={{ color: "gold" }} href="https:/onesignal.com">
              OneSignal (obsługa wiadomości push)
            </a>
            , która może zapisywać i wykorzystywać ciasteczka lub inne
            mechanizmy do gromadzenia informacji o twoim urządzeniu lub tobie
            (zgodnie z polityką prywatności wcześniej wspomnianych podmiotów).
            <br /> <br />
            Jeżeli nie wyrazisz zgody, zostaniesz przekierowany na stronę dla
            starszych urządzeń, która nie wykorzystuje plików cookie.
          </div>
          <br /> <br />
        </div>
        <div style={{ textAlign: "center" }}>
          <a
            id="decline"
            style={{ margin: 5, minWidth: 180 }}
            href="http://old.swanna.net.pl"
            type="button"
            className="btn btn-danger"
          >
            Nie wyrażam zgody
          </a>
          <button
            style={{ margin: 5, minWidth: 180 }}
            onClick={accept}
            type="button"
            className="btn btn-success"
          >
            Wyrażam zgodę
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookiesInfo;
