import React, { Component } from "react";
import $ from "jquery";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";

let blockHome = false;
class Homepage extends Component {
  state = { content: [] };
  componentDidMount = async () => {
    $("#maincontent").css({ height: "var(--end_height)" });
    blockHome = false;
    const { data: content } = await axios.get(
      "https://swanna.net.pl/backend/index.php"
    );
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
              {index < 9 ? <div className="linia"></div> : <br />}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Homepage;
