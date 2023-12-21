import React, { useEffect } from "react";
import $ from "jquery";

let apld = false;
const resze = () => {
  if (window.matchMedia("(max-width: 991px)").matches) {
    if (apld) {
      $("#ogloszenia").insertBefore("#infoContent");
      $(".next").insertBefore("#pdfs");
      $(".demandNew").insertBefore("#pdfs");
      $(".iCannotSee").insertBefore("#pdfs");
      $("#maincontent").css({
        "z-index": "",
      });
      apld = false;
    }
    const ph = $("#pdf").width();
    $("#ogloszenia").css({ height: ph * 3.5 });
  } else {
    if (!apld) {
      $("#fade").addClass("fadein");
      $("#fade").removeClass("fadeout");
      $("#ogloszenia").insertBefore("#top");
      $(".next").insertAfter("#pdfs");
      $(".demandNew").insertAfter("#pdfs");
      $(".iCannotSee").insertAfter("#pdfs");

      $("#maincontent").css({
        "z-index": -1,
      });
      $("#ogloszenia").css({ height: "" });
      apld = true;
    }
  }
};

function Ogloszenia({ clicked, current, setUnclicked }) {
  useEffect(() => {
    $("#msze").removeClass("mszeBackNab");
    $("#msze").removeClass("mszeBackHist");
    $("#msze").addClass("mszeHidden");
    $("#ogloszenia").removeClass("z1");
    $("#ogloszenia").removeClass("none");
    if (window.matchMedia("(min-width: 992px)").matches) {
      $("#fade").addClass("fadein");
      $("#fade").removeClass("fadeout");
      $("#ogloszenia").css({ opacity: 1, animation: "fadein 1s 1" });
      $("#top").addClass("hide");
      $(".next").insertAfter("#pdfs");
      $(".demandNew").insertAfter("#pdfs");
      $(".iCannotSee").insertAfter("#pdfs");
      $("#maincontent").css({
        "z-index": -1,
      });
      apld = true;
    } else {
      $("#maincontent").css({ opacity: 1 });
      const ph = $("#pdf").width();
      $(".next").insertBefore("#pdfs");
      $(".demandNew").insertBefore("#pdfs");
      $(".iCannotSee").insertBefore("#pdfs");
      $("#ogloszenia").insertBefore("#infoContent");
      $("#ogloszenia").css({ height: ph * 3.5, opacity: 1 });
    }
    $(window).resize(resze);

    return () => {
      $("#msze").addClass("mszeBackNab");
      $("#msze").removeClass("mszeHidden");
      $("#top").removeClass("hide");
      $("#ogloszenia").css({
        animation: "fadeout 2000ms 1",
        opacity: 0,
      });
      $("#maincontent").css({ animation: "", opacity: "" });
      setTimeout(() => {
        $("#ogloszenia").addClass("z1");
        $("#maincontent").css({
          "z-index": "",
        });
        $("#ogloszenia").css({ animation: "" });
      }, 1000);
      $(window).off("resize", resze);
      $("#ogloszenia").addClass("none");
      setUnclicked();
      apld = false;
      if (window.matchMedia("(max-width: 992px)").matches) {
        $("#ogloszenia").insertBefore("#top");
      }
    };
  }, []);

  if (clicked) {
    if (current) {
      $("#pdf").css({ animation: "fadeout 800ms 1", opacity: 0 });
      setTimeout(() => {
        $("#pdf").insertAfter("#pdf1");
        $("#pdf1").css({ animation: "fadein 1s 1", opacity: 1 });
        $("#pdf").css({ animation: "" });
      }, 400);
    } else {
      $("#pdf1").css({ animation: "fadeout 800ms 1", opacity: 0 });
      setTimeout(() => {
        $("#pdf1").insertAfter("#pdf");
        $("#pdf").css({ animation: "fadein 1s 1", opacity: 1 });
        $("#pdf1").css({ animation: "" });
      }, 400);
    }
  }

  return (
    <div>
      <div id="infoContent"></div>
    </div>
  );
}

export default Ogloszenia;
