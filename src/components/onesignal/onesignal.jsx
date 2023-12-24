import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import OneSignal from "react-onesignal";
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
      <div
        className="modal fade"
        id="myNotificationsModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
            </div>
            <div className="modal-footer">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneSignalModule;
