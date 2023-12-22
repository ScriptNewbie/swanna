import Menu from "./components/menu";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
import Homepage from "./components/homepage";
import Ogloszenia from "./components/ogloszenia";
import Historia from "./components/historia";
import Kontakt from "./components/kontakt";
import React, { useEffect, useState } from "react";
import $ from "jquery";
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

  return (
    <div>
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
            <Route path="/nabozenstwa" render={() => <Ogloszenia />} />
            <Route
              path=""
              render={() => <Homepage setStyle={setStyle} history={history} />}
            />
          </Switch>
        </div>
      </div>
      <OneSignalModule />
    </div>
  );
}

const Appk = withRouter(Main);
export default Appk;
