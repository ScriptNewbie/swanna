import React, { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
import tools from "../../tools/tools";
import News from "./news";
import Delimiter from "./delimiter";

let blockHome = false;
function Homepage() {
  const [content, setContent] = useState([]);

  useEffect(async () => {
    $("#maincontent").css({ height: "var(--end_height)" });
    blockHome = false;
    try {
      const { data: content } = await axios.get(
        "https://api.swanna.net.pl/index.php"
      );
      setContent(content);
    } catch (e) {
      const content = [
        {
          nazwa: "Błąd połączenia z bazą danych",
          data: "01/01/1970",
          tresc:
            "Z powodu błędu połączenia z bazą danych wyświetlenie aktualności jest niemożliwe. Pozostałe podstrony powinny działać poprawnie.",
        },
      ];
      setContent(content);
    }
    return () => {
      $("#maincontent").css({ height: "" });
    };
  }, []);

  useEffect(() => {
    if (!blockHome) {
      let height = $("#newsContent")[0].offsetHeight + 30;
      if (height > 30) {
        this.props.setStyle(740, height);
        $("#maincontent").css({ height: "" });
        blockHome = true;
      }
    }
  });

  return (
    <div id="newsContent" className="hghKeep">
      <div id="fix">
        {content.map((post, index) => (
          <div key={post.id}>
            <News
              title="Dane parafii"
              date={"Przypięty"}
              content={
                <p>
                  Dane parafii tj. adres, telefon czy numer konta bankowego
                  znajdziesz na podstronie{" "}
                  <a
                    id="redToCon"
                    href="/kontakt"
                    onClick={(e) => {
                      tools.changeScreen(e, "/kontakt", this.props.history);
                    }}
                  >
                    kontakt!
                  </a>
                </p>
              }
            />
            <Delimiter />
            <News title={post.nazwa} date={post.data} content={post.tresc} />
            <Delimiter index={index} lastIndex={content.length - 1} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
