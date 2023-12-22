import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import OneSignal from "react-onesignal";
import $ from "jquery";
import "./onesignal.css";

function OneSignalModule() {
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    OneSignal.on("subscriptionChange", function (subscribed) {
      setSubscribed(subscribed);
    });
    OneSignal.isPushNotificationsEnabled((subscribed) => {
      setSubscribed(subscribed);
    });
  }, []);

  return (
    <div>
      <div id="modalOneSignal">
        <div className="card">
          <div className="card-header">Powiadomienia</div>
          <div className="card-body">
            <p className="card-text">
              {subscribed ? (
                <span>
                  <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />{" "}
                  Wygląda na to, że masz włączone powiadomienia. Jeśli nie chesz
                  otrzymywać powiadomień, kliknij "Anuluj subskrybcję"!
                </span>
              ) : (
                <span>
                  Wygląda na to, że nie masz włączonych powiadomień. Jeśli
                  chcesz otrzymywać powiadomienia o nowych ogłoszeniach i
                  aktualnościach, kliknij "Subskrybuj"!
                </span>
              )}{" "}
              <br />
              <br />
              Uwaga! Funkcja w faze testów - może nie działać poprawnie. Jeśli
              anulowałeś subskrybcję, a nadal otrzymujesz powiadomienia, lub
              jeśli zasubskrybowałeś, a nie otrzymujesz powiadomień, napisz na
              adres e-mail: admin@swanna.net.pl
            </p>
            <center>
              <button
                onClick={() => {
                  OneSignal.isPushNotificationsEnabled((subscribed) => {
                    if (subscribed) {
                      OneSignal.setSubscription(false);
                    } else {
                      OneSignal.setSubscription(true).then(() => {
                        OneSignal.isPushNotificationsEnabled((subscribed) => {
                          if (!subscribed)
                            OneSignal.registerForPushNotifications();
                        });
                      });
                    }
                  });
                }}
                className={
                  "btn btn-" + (subscribed ? "danger" : "success") + " m-2"
                }
              >
                {subscribed ? (
                  <span>Anuluj subskrybcję</span>
                ) : (
                  <span>Subskrybuj</span>
                )}
              </button>
              <button
                className="btn btn-secondary m-2"
                onClick={() => {
                  setTimeout(() => {
                    $("#modalOneSignal").css({
                      display: "none",
                    });
                  }, 500);
                  $("#modalOneSignal").css({
                    animation: "fadeout 1000ms 1",
                  });
                }}
              >
                Zamknij okno
              </button>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneSignalModule;
