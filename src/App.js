import Menu from "./components/menu";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
import Homepage from "./components/homepage";
import Ogloszenia from "./components/ogloszenia";
import Historia from "./components/historia";
import Kontakt from "./components/kontakt";
import React, { Component } from "react";
import $ from "jquery";
import axios from "axios";

const resize_duration = 1000;
let ready = true;

class App extends Component {
  state = {
    style: {
      start_width: 740,
      end_width: 740,
      start_height: 800,
      end_height: 800,
    },
    current_ogloszenie: 0,
    ogloszenia_clicked: false,
    demandNewText: "",
  };

  componentDidMount = () => {
    $("a").click((e) => {
      if (e.button === 0 && !e.metaKey && !e.target.getAttribute("target")) {
        e.preventDefault();
        if (ready) {
          const href = e.target.getAttribute("href");
          const current = this.props.location.pathname;
          if (current !== href && href) {
            let del = 200;
            if (href === "/nabozenstwa") del = 400;
            var body = $("html, body");
            body.stop().animate({ scrollTop: 0 }, 10, "swing", () => {
              $("#fade").removeClass("fadein");
              if (href === "/nabozenstwa") {
                $("#maincontent").css({
                  animation: "fadeout 400ms 1",
                  opacity: 0,
                });
              } else $("#fade").addClass("fadeout");
              setTimeout(() => {
                this.props.history.push(href);
              }, del);
            });
          }
        }
      }
    });
  };

  setStyle = (width, height) => {
    const style = {
      start_width: this.state.style.end_width,
      end_width: width,
      start_height: this.state.style.end_height,
      end_height: height,
    };
    this.setState({ style }, () => {
      ready = false;
      $("#maincontent").addClass("resize");
      $("#fade").addClass("fadein");
      $("#fade").removeClass("fadeout");
      setTimeout(() => {
        $("#maincontent").removeClass("resize");
        ready = true;
      }, resize_duration);
    });
  };

  setOgloszeniaUnclicked = () => {
    this.setState({ ogloszenia_clicked: false });
  };

  getStyle = () => {
    const style = {
      "--start_width": this.state.style.start_width.toString() + "px",
      "--end_width": this.state.style.end_width.toString() + "px",
      "--start_height": this.state.style.start_height.toString() + "px",
      "--end_height": this.state.style.end_height.toString() + "px",
      "--resize_duration": resize_duration.toString() + "ms",
    };
    return style;
  };
  render() {
    let statusStyle = "alert alert-";
    if (this.state.demandNewText === "Dziękujemy za wysłanie zgłoszenia!")
      statusStyle += "success";
    else statusStyle += "secondary";
    return (
      <div>
        <div id="ogloszenia" className="none z1">
          <span id="pdfs">
            <iframe
              id="pdf"
              src="https://docs.google.com/gview?url=https://swanna.net.pl/ogloszenia/ogloszenia.pdf&amp;embedded=true"
            ></iframe>
            <iframe
              id="pdf1"
              src="https://docs.google.com/gview?url=https://swanna.net.pl/ogloszenia/next.pdf&amp;embedded=true"
            ></iframe>
          </span>
          <div
            className="next"
            onClick={() => {
              this.setState({
                current_ogloszenie: !this.state.current_ogloszenie,
                ogloszenia_clicked: true,
              });
              if (this.state.current_ogloszenie) {
                $("#after").fadeOut(400, () => {
                  $("#after").addClass("afternext");
                  $("#after").removeClass("afterback");
                  $("#after").fadeIn(200);
                });
              } else {
                $("#after").fadeOut(400, () => {
                  $("#after").addClass("afterback");
                  $("#after").removeClass("afternext");
                  $("#after").fadeIn(200);
                });
              }
            }}
          >
            <span id="after" className="afternext"></span>
          </div>
          <div
            className="demandNew"
            onClick={() => {
              $("#modalDemandNew").css({
                display: "block",
                animation: "fadein 500ms 1",
              });
            }}
          >
            Zgłoś nieaktualne ogłoszenia
          </div>
          <div
            onClick={() => {
              window.open("https://swanna.net.pl/ogloszenia/ogloszenia.pdf");
            }}
            className="iCannotSee"
          >
            Nie widzę ogłoszeń!
          </div>
        </div>
        <div id="top">
          <Menu />
        </div>
        <div id="maincontent" style={this.getStyle()}>
          <div id="fade">
            <Switch>
              <Route
                path="/kontakt"
                render={() => <Kontakt setStyle={this.setStyle} />}
              />
              <Route
                path="/historia"
                render={() => <Historia setStyle={this.setStyle} />}
              />
              <Route
                path="/nabozenstwa"
                render={() => (
                  <Ogloszenia
                    current={this.state.current_ogloszenie}
                    clicked={this.state.ogloszenia_clicked}
                    setUnclicked={this.setOgloszeniaUnclicked}
                  />
                )}
              />
              <Route
                path=""
                render={() => <Homepage setStyle={this.setStyle} />}
              />
            </Switch>
          </div>
        </div>
        <div id="modalDemandNew">
          <div className="card">
            <div className="card-header">Zgłoś nieaktualne ogłoszenia</div>
            <div className="card-body">
              <p className="card-text">
                {this.state.demandNewText && (
                  <div class={statusStyle} role="alert">
                    {this.state.demandNewText}
                  </div>
                )}
                Uwaga! Jeżeli w ogóle nie widzisz ogłoszeń na stronie,
                skorzystaj z opcji "Nie widzę ogłoszeń"! Ta opcja służy tylko i
                wyłącznie do zgłaszania nieaktualnych ogłoszeń!
              </p>
              <button
                className="btn btn-secondary m-2"
                onClick={() => {
                  setTimeout(() => {
                    $("#modalDemandNew").css({
                      display: "none",
                    });
                  }, 500);
                  $("#modalDemandNew").css({
                    animation: "fadeout 500ms 1",
                  });
                }}
              >
                Zamknij okno
              </button>
              {!this.state.demandNewText && (
                <button
                  onClick={async () => {
                    const { data: demandNewText } = await axios.get(
                      "https://swanna.net.pl/backend/mail.php"
                    );
                    this.setState({ demandNewText });
                  }}
                  className="btn btn-success m-2"
                >
                  Wyślij zgłoszenie!
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Appk = withRouter(App);
export default Appk;
