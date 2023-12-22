import React, { useEffect } from "react";

function Ogloszenia({ setCurrentScreen }) {
  useEffect(() => {
    setCurrentScreen("ogloszenia");
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return <div id="infoContent"></div>;
}

export default Ogloszenia;
