import React, { Component } from "react";
import $ from "jquery";
import axios from "axios";
import tools from "../../tools/tools";
import News from "./news";
import Delimiter from "./delimiter";

let blockHome = false;
let isAttached = false;
class Homepage extends Component {
  state = { content: [] };
  componentDidMount = async () => {
    $("#maincontent").css({ height: "var(--end_height)" });
    blockHome = false;
    const daneParafii = {
      nazwa: "Dane parafii",
      data: "Przypięty",
      tresc:
        "Dane parafii tj. adres, telefon czy numer konta bankowego znajdziesz na podstronie <a id='redToCon' href='/kontakt'>kontakt!</a>",
    };
    try {
      const { data: content } = await axios.get(
        "https://api.swanna.net.pl/index.php"
      );
      content.unshift(daneParafii);
      this.setState({ content });
    } catch (e) {
      const content = [
        daneParafii,
        {
          nazwa: "Błąd połączenia z bazą danych",
          data: "01/01/1970",
          tresc:
            "Z powodu błędu połączenia z bazą danych wyświetlenie aktualności jest niemożliwe. Pozostałe podstrony powinny działać poprawnie.",
        },
      ];
      this.setState({ content });
    }
  };
  componentDidUpdate() {
    if (!isAttached) {
      $("#redToCon").click((e) => {
        tools.changeScreen(e, "/kontakt", this.props.history);
        isAttached = true;
      });
    }
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
    isAttached = false;
  }

  render() {
    return (
      <div id="newsContent" className="hghKeep">
        <div id="fix">
          {this.state.content.map((post, index) => (
            <div key={post.id}>
              <News post={post} />
              <Delimiter
                index={index}
                lastIndex={this.state.content.length - 1}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Homepage;
