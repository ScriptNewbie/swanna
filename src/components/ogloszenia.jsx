import React, { useEffect } from "react";

function Ogloszenia({ setCurrentScreen }) {
  useEffect(() => {
    setCurrentScreen("ogloszenia");
  }, []);

  return (
    <div>
      <div id="infoContent"></div>
    </div>
  );
}

export default Ogloszenia;
