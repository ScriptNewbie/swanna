import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell as solidBell } from "@fortawesome/free-solid-svg-icons";
import { faBell as regularBell } from "@fortawesome/free-regular-svg-icons";
import CookiesContext from "../contexts/cookiesContext";

function NotificationBell() {
  const [subscribed, setSubscribed] = useState(false);
  const { cookiesEnabled } = useContext(CookiesContext);

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
