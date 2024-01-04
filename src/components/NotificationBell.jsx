import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell as solidBell } from "@fortawesome/free-solid-svg-icons";
import { faBell as regularBell } from "@fortawesome/free-regular-svg-icons";
import OneSignal from "react-onesignal";
import CookiesContext from "../contexts/cookiesContext";

function NotificationBell() {
  const [subscribed, setSubscribed] = useState(false);
  const { cookiesEnabled } = useContext(CookiesContext);

  useEffect(() => {
    if (cookiesEnabled) {
      OneSignal.init({
        appId: "6b57325a-836e-43c3-a551-04928b8e7285",
        welcomeNotification: {
          title: "Szczęść Boże!",
          message:
            "Jest to automatyczna wiadomość powitalna. Dziękujemy za zapisanie się do powiadomień! Funkcjonalność jest w fazie testów i może nie działać prawidłowo!",
        },
      });

      OneSignal.on("subscriptionChange", function (subscribed) {
        setSubscribed(subscribed);
      });
      OneSignal.isPushNotificationsEnabled((subscribed) => {
        setSubscribed(subscribed);
      });
    }
  }, [cookiesEnabled]);

  return (
    <div>
      <div
        data-bs-toggle="modal"
        data-bs-target="#myNotificationsModal"
        style={{
          position: "absolute",
          top: 5,
          right: 5,
          backgroundColor: "rgba(0,0,0, 0.3)",
          color: "gold",
          width: 60,
          height: 60,
          fontSize: 30,
          borderRadius: "10px",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          display: "flex",
        }}
      >
        <FontAwesomeIcon icon={subscribed ? solidBell : regularBell} />
      </div>
    </div>
  );
}

export default NotificationBell;
