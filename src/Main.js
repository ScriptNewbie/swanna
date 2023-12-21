import Menu from "./components/menu";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
import Homepage from "./components/homepage";
import Ogloszenia from "./components/ogloszenia";
import Historia from "./components/historia";
import Kontakt from "./components/kontakt";
import React, { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
import LeftPanel from "./components/leftpanel";
import Cookies from "js-cookie";

import OneSignal from "react-onesignal";
import OneSignalModule from "./components/onesignal";

const resize_duration = 1000;
let ready = true;

function Main({ wasCookies, location, history }) {
  const [style, setStyleObject] = useState({
    start_width: 740,
    end_width: 740,
    start_height: 800,
    end_height: 800,
  });
  const [state, setState] = useState({
    current_ogloszenie: 0,
    ogloszenia_clicked: false,
    demandNewText: "",
  });

  useEffect(() => {
    ready = false;
    $("#fade").addClass("fadein");
    $("#fade").removeClass("fadeout");
    setTimeout(() => {
      ready = true;
    }, resize_duration);
  }, [style]);

  useEffect(() => {
    if (wasCookies === "yes") {
      window.scrollTo(0, 0);
    }
    Cookies.set("allowcookies", "true", {
      expires: 399,
      path: "/",
    });
    OneSignal.init({
      appId: "6b57325a-836e-43c3-a551-04928b8e7285",
      promptOptions: {
        slidedown: {
          enabled: true,
          autoPrompt: true,
          actionMessage:
            "Czy chcesz otrzymywać powiadomienia o nowych ogłoszeniach i aktualnościach?",
          acceptButtonText: "Tak",
          cancelButtonText: "Nie",
        },
      },
      welcomeNotification: {
        title: "Szczęść Boże!",
        message:
          "Jest to automatyczna wiadomość powitalna. Dziękujemy za zapisanie się do powiadomień! Funkcjonalność jest w fazie testów i może nie działać prawidłowo!",
      },
    }).then(() => {
      OneSignal.showSlidedownPrompt().then(() => {});
    });
  }, []);

  const getStyle = () => {
    const _style = {
      "--start_width": style.start_width.toString() + "px",
      "--end_width": style.end_width.toString() + "px",
      "--start_height": style.start_height.toString() + "px",
      "--end_height": style.end_height.toString() + "px",
      "--resize_duration": resize_duration.toString() + "ms",
    };
    return _style;
  };

  const setStyle = (width, height) => {
    const _style = {
      start_width: style.end_width,
      end_width: width,
      start_height: style.end_height,
      end_height: height,
    };
    setStyleObject(_style);
  };

  const setOgloszeniaUnclicked = () => {
    setState({ ogloszenia_clicked: false });
  };

  const openFromApi = (withNext) => {
    const pageToOpen =
      state.current_ogloszenie && withNext
        ? "https://api.swanna.net.pl/ogloszenia/next.pdf"
        : "https://api.swanna.net.pl/ogloszenia/ogloszenia.pdf";
    console.log(pageToOpen);
    window.open(pageToOpen);
  };

  let statusStyle = "alert alert-";
  if (state.demandNewText === "Dziękujemy za wysłanie zgłoszenia!")
    statusStyle += "success";
  else statusStyle += "secondary";
  return (
    <div>
      <div id="ogloszenia" className="none z1">
        <span id="pdfs">
          <iframe
            title="Ogłoszenia"
            id="pdf"
            src="https://docs.google.com/gview?url=https://api.swanna.net.pl/ogloszenia/ogloszenia.pdf&amp;embedded=true"
            name="pdf"
          ></iframe>
          <iframe
            title="Ogłoszenia na przyszły tydzień"
            id="pdf1"
            src="https://docs.google.com/gview?url=https://api.swanna.net.pl/ogloszenia/next.pdf&amp;embedded=true"
            name="pdf1"
          ></iframe>
        </span>
        <div
          className="next"
          onClick={() => {
            setState({
              current_ogloszenie: !state.current_ogloszenie,
              ogloszenia_clicked: true,
            });
            if (state.current_ogloszenie) {
              $("#after").fadeOut(400, () => {
                $("#after").addClass("afternext");
                $("#after").removeClass("afterback");
                $("#after").fadeIn(200);
              });
            } else {
              $("#after").fadeOut(400, () => {
                $("#after").addClass("afterback");
                $("#after").removeClass("afternext");
                $("#after").fadeIn(200);
              });
            }
          }}
        >
          <span id="after" className="afternext"></span>
        </div>
        <div
          className="demandNew"
          onClick={() => {
            $("#modalDemandNew").css({
              display: "block",
              animation: "fadein 500ms 1",
            });
          }}
        >
          Zgłoś nieaktualne ogłoszenia
        </div>
        <div
          onClick={() => {
            openFromApi(true);
          }}
          className="iCannotSee"
        >
          Nie widzę ogłoszeń!
        </div>
      </div>
      <div id="top">
        <Menu />
      </div>
      <LeftPanel />
      <div id="maincontent" style={getStyle()}>
        <div id="fade">
          <Switch>
            <Route
              path="/kontakt"
              render={() => <Kontakt setStyle={setStyle} />}
            />
            <Route
              path="/historia"
              render={() => <Historia setStyle={setStyle} />}
            />
            <Route
              path="/nabozenstwa"
              render={() => (
                <Ogloszenia
                  current={state.current_ogloszenie}
                  clicked={state.ogloszenia_clicked}
                  setUnclicked={setOgloszeniaUnclicked}
                />
              )}
            />
            <Route
              path=""
              render={() => <Homepage setStyle={setStyle} history={history} />}
            />
          </Switch>
        </div>
      </div>
      <div id="modalDemandNew">
        <div className="card">
          <div className="card-header">Zgłoś nieaktualne ogłoszenia</div>
          <div className="card-body">
            <p className="card-text">
              {state.demandNewText && (
                <div className={statusStyle} role="alert">
                  {state.demandNewText}
                </div>
              )}
              Uwaga! <br /> <br />
              Przed wysłaniem zgłoszenia odśwież stronę - być może już są dodane
              nowe ogłoszenia! <br /> <br />
              Jeżeli w ogóle nie widzisz ogłoszeń na stronie kliknij{" "}
              <span
                style={{
                  cursor: "pointer",
                  color: "blue",
                  textDecoration: "underline",
                }}
                onClick={() => {
                  openFromApi(false);
                }}
              >
                tutaj
              </span>
              ! Ta opcja służy tylko i wyłącznie do zgłaszania nieaktualnych
              ogłoszeń!
            </p>
            <button
              className="btn btn-secondary m-2"
              onClick={() => {
                setTimeout(() => {
                  $("#modalDemandNew").css({
                    display: "none",
                  });
                }, 500);
                $("#modalDemandNew").css({
                  animation: "fadeout 1000ms 1",
                });
              }}
            >
              Zamknij okno
            </button>
            {!state.demandNewText && (
              <button
                onClick={async () => {
                  const { data: demandNewText } = await axios.get(
                    "https://api.swanna.net.pl/backend/mail.php"
                  );
                  setState({ demandNewText });
                }}
                className="btn btn-success m-2"
              >
                Wyślij zgłoszenie!
              </button>
            )}
          </div>
        </div>
      </div>
      <OneSignalModule />
    </div>
  );
}

const Appk = withRouter(Main);
export default Appk;
