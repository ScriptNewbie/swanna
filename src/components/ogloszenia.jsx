import React, { Component } from "react";
import $ from "jquery";
let apld = false;

const resze = () => {
  if (window.matchMedia("(max-width: 991px)").matches) {
    if (apld) {
      $("#top").addClass("show");
      $("#top").removeClass("hide");
      $("#maincontent").css({ display: "block" });
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
      $("#maincontent").css({ display: "none" });
      $("#fade").addClass("fadein");
      $("#fade").removeClass("fadeout");
      $("#ogloszenia").insertBefore("#top");
      $(".next").insertAfter("#pdfs");
      $(".demandNew").insertAfter("#pdfs");
      $(".iCannotSee").insertAfter("#pdfs");
      $("#top").addClass("hide");
      $("#top").removeClass("show");

      $("#maincontent").css({
        "z-index": -1,
      });
      $("#ogloszenia").css({ height: "" });
      apld = true;
    }
  }
};

class Ogloszenia extends Component {
  async componentDidMount() {
    $("#msze").addClass("mszeNabFlag");
    $("#msze").removeClass("mszeBackNab");
    $("#msze").removeClass("mszeBackHist");
    if ($(".mszeHistFlag").length > 0) {
      $("#msze").removeClass("mszeHistFlag");
      $("#msze").addClass("mszeHideFromHist");
      setTimeout(() => {
        $("#msze").addClass("mszeHidden");
      }, 900);
    } else {
      $("#msze").addClass("mszeHide");
      setTimeout(() => {
        $("#msze").addClass("mszeHidden");
      }, 900);
    }
    $("#ogloszenia").removeClass("z1");
    $("#ogloszenia").removeClass("none");
    if (window.matchMedia("(min-width: 992px)").matches) {
      $("#maincontent").css({ display: "none" });
      $("#fade").addClass("fadein");
      $("#fade").removeClass("fadeout");
      $("#ogloszenia").css({ opacity: 1, animation: "fadein 1s 1" });
      $("#top").addClass("hide");
      $("#top").removeClass("show");
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
  }

  componentWillUnmount() {
    $("#msze").addClass("mszeBackNab");
    $("#msze").removeClass("mszeHide");
    $("#msze").removeClass("mszeHideFromHist");
    $("#msze").removeClass("mszeHidden");

    $("#top").addClass("show");
    $("#top").removeClass("hide");
    $("#ogloszenia").css({
      animation: "fadeout 1000ms 1",
      opacity: 0,
    });
    $("#maincontent").css({ display: "", animation: "", opacity: "" });
    setTimeout(() => {
      $("#ogloszenia").addClass("z1");
      $("#maincontent").css({
        "z-index": "",
      });
      $("#top").removeClass("show");
      $("#ogloszenia").css({ animation: "" });
    }, 1000);
    $(window).off("resize", resze);
    $("#ogloszenia").addClass("none");
    this.props.setUnclicked();
    apld = false;
    if (window.matchMedia("(max-width: 992px)").matches) {
      $("#ogloszenia").insertBefore("#top");
    }
  }

  render() {
    if (this.props.clicked) {
      if (this.props.current) {
        $("#pdf").css({ animation: "fadeout 400ms 1", opacity: 0 });
        setTimeout(() => {
          $("#pdf").insertAfter("#pdf1");
          $("#pdf1").css({ animation: "fadein 1s 1", opacity: 1 });
          $("#pdf").css({ animation: "" });
        }, 400);
      } else {
        $("#pdf1").css({ animation: "fadeout 400ms 1", opacity: 0 });
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
}

export default Ogloszenia;
