import Menu from "./components/menu";
import { Route, Switch } from "react-router-dom";
import Homepage from "./components/homepage";
import Ogloszenia from "./components/ogloszenia";
import Historia from "./components/historia";
import Kontakt from "./components/kontakt";
import React, { useEffect, useState, useRef } from "react";
import LeftPanel from "./components/leftpanel";
import PdfReader from "./components/ogloszenia/pdfReader";
import CookiesSite from "./components/cookies/Cookies";
import Link from "./components/Link";
import Version from "./components/version";
import { Snow } from "./components/snow/Snow";
import { useTransitionContext } from "./contexts/TransitionContext";
import { useCookiesContext } from "./contexts/cookiesContext";

function App() {
  const { transitioning } = useTransitionContext();
  const content = useRef(null);
  const { cookiesEnabled, refreshCookiesExpiry } = useCookiesContext();

  useEffect(() => {
    refreshCookiesExpiry();
    document.getElementById("oldBrowserPrompt").style.display = "none";
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
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}
      >
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
                path="/cookies"
                render={() => (
                  <CookiesSite
                    adjustHeight={adjustHeight}
                    setCurrentScreen={setCurrentScreen}
                  />
                )}
              />
              <Route
                path="/pdf/:id"
                render={() => <PdfReader setCurrentScreen={setCurrentScreen} />}
              />
              <Route
                path=""
                render={() => (
                  <Homepage
                    setCurrentScreen={setCurrentScreen}
                    adjustHeight={adjustHeight}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </div>

      <div
        id="footer"
        style={{
          display:
            currentScreen === "ogloszenia" || !cookiesEnabled ? "none" : "",
        }}
        className="mt-3"
      >
        <Link to="/cookies">Polityka Cookies</Link>
      </div>
      <Version />
      {/* <Snow /> */}
    </div>
  );
}

export default App;
