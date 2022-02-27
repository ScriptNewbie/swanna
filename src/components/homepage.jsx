import React, { Component } from "react";
import $ from "jquery";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";

let blockHome = false;
class Homepage extends Component {
  state = { content: [] };
  componentDidMount = async () => {
    $("#msze").removeClass("mszeHistFlag");
    $("#msze").removeClass("mszeNabFlag");
    $("#maincontent").css({ height: "var(--end_height)" });
    blockHome = false;
    const { data: content } = await axios.get(
      "https://swanna.net.pl/backend/index.php"
    );
    const daneParafii = {
      nazwa: "Dane parafii",
      data: "Przypięty",
      tresc:
        "<b>Adres kościoła pw. Świętej Anny:</b><br />ul. Gliwicka 30<br />42-600 Tarnowskie Góry<br /><b>Adres probostwa, kancelarii oraz kaplicy pw. Świętej Jadwigi:</b><br />ul. Torowa 45<br />42-600 Tarnowskie Góry<br /><b>Godziny pracy kancelari:</b><br />Poniedziałek 12:00 - 15:00<br />Piątek 15:00 - 17:00<br /><b>e-mail:</b> kontakt@swanna.net.pl <br /><b>Tel.</b> +48 32 285 85 47 <br /><b>Numer konta bankowego parafii:</b> PL 42 1050 1230 1000 0090 3256 7647",
    };
    content.unshift(daneParafii);
    this.setState({ content });
  };
  componentDidUpdate() {
    if (!blockHome) {
      let height = $("#newsContent")[0].offsetHeight + 30;
      if (height > 30) {
        this.props.setStyle(740, height);
        $("#maincontent").css({ height: "" });
        blockHome = true;
      }
    }
  }

  componentWillUnmount() {
    $("#maincontent").css({ height: "" });
  }

  render() {
    return (
      <div id="newsContent" className="hghKeep">
        <div id="fix">
          {this.state.content.map((post, index) => (
            <div key={post.id}>
              <h2 className="title_home">{ReactHtmlParser(post.nazwa)}</h2>
              <div className="date_home">
                Opublikowano: {ReactHtmlParser(post.data)}
              </div>
              <div className="post_home">{ReactHtmlParser(post.tresc)}</div>
              {index < this.state.content.length - 1 ? (
                <div className="linia"></div>
              ) : (
                <br />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Homepage;
