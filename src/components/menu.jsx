import React, { Component } from "react";
import { Link } from "react-router-dom";
import NotificationBell from "./NotificationBell";

class Menu extends Component {
  componentDidMount() {
    document.querySelectorAll(".nav-link").forEach(function (navLink) {
      navLink.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 991px)").matches) {
          document.querySelector(".navbar-toggler").click();
        }
      });
    });
  }
  render() {
    return (
      <div id="menuContainer">
        <div id="logo">
          <Link to="/">
            <div className="logonapis">
              Parafia <br />
              <span className="logobigger">Świętej Anny</span>
              <br />w Tarnowskich Górach
            </div>
          </Link>
          <NotificationBell />
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
                    Porządek nabożeństw
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
