import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./onesignal.css";
import CookiesContext from "../../contexts/cookiesContext";
import CookiesMessage from "../cookies/CookiesMessage";
import CookiesAcceptButton from "../cookies/CookiesAcceptButton";

function OneSignalModule() {
  const [subscribed, setSubscribed] = useState(false);
  const [works, setWorks] = useState(false);
  const { cookiesEnabled } = useContext(CookiesContext);

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
              <h5 className="modal-title">Powiadomienia push</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {cookiesEnabled ? (
                <>
                  {works ? (
                    <>
                      {subscribed ? (
                        <span>
                          <FontAwesomeIcon
                            icon={faCheck}
                            style={{ color: "green" }}
                          />
                          Wygląda na to, że masz włączone powiadomienia. Jeśli
                          nie chesz otrzymywać powiadomień, kliknij "Anuluj
                          subskrybcję"!
                        </span>
                      ) : (
                        <span>
                          Wygląda na to, że nie masz włączonych powiadomień.
                          Jeśli chcesz otrzymywać powiadomienia o nowych
                          ogłoszeniach i aktualnościach, kliknij "Subskrybuj"!
                        </span>
                      )}
                      <br />
                      <br />
                      Uwaga! Funkcja w faze testów - może nie działać poprawnie.
                      Jeśli anulowałeś subskrybcję, a nadal otrzymujesz
                      powiadomienia, lub jeśli zasubskrybowałeś, a nie
                      otrzymujesz powiadomień, napisz na adres e-mail:
                      admin@swanna.net.pl
                    </>
                  ) : (
                    <>
                      Wygląda na to, że twoja przeglądarka nie obsługuje
                      powiadomień push!
                    </>
                  )}
                </>
              ) : (
                <CookiesMessage />
              )}
            </div>

            <div className="modal-footer">
              {!cookiesEnabled && <CookiesAcceptButton />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneSignalModule;
