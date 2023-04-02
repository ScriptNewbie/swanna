import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell as solidBell,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faBell as regularBell } from "@fortawesome/free-regular-svg-icons";
import OneSignal from "react-onesignal";
import $ from "jquery";

function NotificationBell() {
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => {
          $("#modalOneSignal").css({
            display: "block",
            animation: "fadein 500ms 1",
          });
        }}
      >
        <FontAwesomeIcon icon={subscribed ? solidBell : regularBell} />
      </div>
    </div>
  );
}

export default NotificationBell;
