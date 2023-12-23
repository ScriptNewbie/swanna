import Menu from "./components/menu";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
import Homepage from "./components/homepage";
import Ogloszenia from "./components/ogloszenia";
import Historia from "./components/historia";
import Kontakt from "./components/kontakt";
import React, { useContext, useEffect, useState, useRef } from "react";
import LeftPanel from "./components/leftpanel";
import Cookies from "js-cookie";

import OneSignal from "react-onesignal";
import OneSignalModule from "./components/onesignal";
import TransitionContext from "./contexts/TransitionContext";

function Main({ wasCookies, history }) {
  const { transitioning } = useContext(TransitionContext);
  const content = useRef(null);

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

  const [currentScreen, setCurrentScreen] = useState("homepage");

  const adjustHeight = (height) => {
    content.current?.style.setProperty("--height", `${height}px`);
  };

  return (
    <div>
      <div id="top" className={currentScreen === "ogloszenia" ? "hide" : ""}>
        <Menu />
      </div>
      <LeftPanel currentScreen={currentScreen} />
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <div
          id="maincontent"
          ref={content}
          className={
            currentScreen === "ogloszenia"
              ? "mainContentOgloszenia"
              : currentScreen === "historia"
              ? "mainContentHistoria"
              : ""
          }
        >
          <div id="fade" className={transitioning ? "fadeout" : "fadein"}>
            <Switch>
              <Route
                path="/kontakt"
                render={() => (
                  <Kontakt
                    adjustHeight={adjustHeight}
                    setCurrentScreen={setCurrentScreen}
                  />
                )}
              />
              <Route
                path="/historia"
                render={() => (
                  <Historia
                    setCurrentScreen={setCurrentScreen}
                    adjustHeight={adjustHeight}
                  />
                )}
              />
              <Route
                path="/nabozenstwa"
                render={() => (
                  <Ogloszenia setCurrentScreen={setCurrentScreen} />
                )}
              />
              <Route
                path=""
                render={() => (
                  <Homepage
                    setCurrentScreen={setCurrentScreen}
                    history={history}
                    adjustHeight={adjustHeight}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </div>
      <OneSignalModule />
    </div>
  );
}

const Appk = withRouter(Main);
export default Appk;
