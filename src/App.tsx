import { useEffect, useRef, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Menu from "./components/menu";
import Homepage from "./components/homepage";
import Ogloszenia from "./components/ogloszenia";
import Historia from "./components/historia";
import Kontakt from "./components/kontakt";
import LeftPanel from "./components/leftpanel";
import PdfReader from "./components/ogloszenia/pdfReader";
import CookiesSite from "./components/cookies/Cookies";
import Link from "./components/Link";
import Version from "./components/version";
// import { Snow } from "./components/snow/Snow";
import { useTransitionContext } from "./contexts/TransitionContext";
import { useCookiesContext } from "./contexts/cookiesContext";
import type { Screen } from "./types";

function App() {
  const { transitioning } = useTransitionContext();
  const content = useRef<HTMLDivElement>(null);
  const { cookiesEnabled, refreshCookiesExpiry } = useCookiesContext();

  useEffect(() => {
    refreshCookiesExpiry();
    const prompt = document.getElementById("oldBrowserPrompt");
    if (prompt) {
      prompt.style.display = "none";
    }
  }, []);

  const [currentScreen, setCurrentScreen] = useState<Screen>("homepage");

  const adjustHeight = (height: number) => {
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
      >
        <Link to="/cookies">Polityka Cookies</Link>
      </div>
      <Version />
      {/* <Snow /> */}
    </div>
  );
}

export default App;
