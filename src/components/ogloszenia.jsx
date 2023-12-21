import React, { useEffect } from "react";
import $ from "jquery";

function Ogloszenia() {
  useEffect(() => {
    $("#msze").addClass("mszeHidden");
    $("#top").addClass("hide");

    return () => {
      $("#top").removeClass("hide");
      $("#msze").removeClass("mszeHidden");
    };
  }, []);

  return (
    <div>
      <div id="infoContent"></div>
    </div>
  );
}

export default Ogloszenia;
