import $ from "jquery";
const exports = {
  changeScreen: (e, location, history) => {
    if (e.button === 0 && !e.metaKey) {
      e.preventDefault();
      if (true) {
        let del = 200;
        if (location === "/nabozenstwa") del = 400;
        var body = $("html, body");
        body.stop().animate({ scrollTop: 0 }, 10, "swing", () => {
          $("#fade").removeClass("fadein");
          if (location === "/nabozenstwa") {
            $("#maincontent").css({
              animation: "fadeout 400ms 1",
              opacity: 0,
            });
          } else $("#fade").addClass("fadeout");
          setTimeout(() => {
            history.push(location);
          }, del);
        });
      }
    }
  },
};
export default exports;
