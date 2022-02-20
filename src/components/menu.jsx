import React, { Component } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";

class Menu extends Component {
  componentDidMount() {
    let changed = false;
    if (window.matchMedia("(max-width: 991px)").matches) {
      $("#logo").insertAfter("#menu");
      changed = true;
    }
    $(window).resize(function () {
      if (window.matchMedia("(max-width: 991px)").matches) {
        if (!changed) {
          $("#logo").insertAfter("#menu");
          changed = true;
        }
      } else {
        if (changed) {
          $("#menu").insertAfter("#logo");
          changed = false;
        }
      }
    });
    $(".nav-link").click(function () {
      if (window.matchMedia("(max-width: 991px)").matches) {
        $(".navbar-toggler").trigger("click");
      }
    });
  }
  render() {
    return (
      <div>
        <div id="logo">
          <Link to="/">
            <div className="logonapis">
              Parafia <br />
              <span className="logobigger">Świętej Anny</span>
              <br />w Tarnowskich Górach
            </div>
          </Link>
        </div>
        <div id="menu">
          <nav className="navbar navbar-expand-lg navbar-dark menu">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/"></Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <Link className="nav-link" to="/">
                    Aktualności
                  </Link>
                  <Link className="nav-link" to="nabozenstwa">
                    Porządek naborzeństw
                  </Link>
                  <Link className="nav-link" to="historia">
                    Historia kościoła
                  </Link>
                  <Link className="nav-link last" to="kontakt">
                    Kontakt
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Menu;
