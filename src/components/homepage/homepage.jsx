import React, { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
import "./homepage.css";
import News from "./news";
import Delimiter from "./delimiter";
import Link from "../Link";

let blockHome = false;
function Homepage({ setStyle, history }) {
  const [content, setContent] = useState([]);

  useEffect(() => {
    $("#maincontent").css({ height: "var(--end_height)" });
    blockHome = false;
    const daneParafii = {
      id: -1,
      nazwa: "Dane Parafii",
      data: "Przypięty",
      tresc: (
        <p>
          Dane parafii tj. adres, telefon czy numer konta bankowego znajdziesz
          na podstronie <Link to="/kontakt">kontakt!</Link>
        </p>
      ),
    };
    const fetchData = async () => {
      try {
        const { data: content } = await axios.get(
          "https://api.swanna.net.pl/index.php"
        );
        setContent([daneParafii, ...content]);
      } catch (e) {
        const content = [
          {
            nazwa: "Błąd połączenia z bazą danych",
            data: "01/01/1970",
            tresc:
              "Z powodu błędu połączenia z bazą danych wyświetlenie aktualności jest niemożliwe. Pozostałe podstrony powinny działać poprawnie.",
          },
        ];
        setContent([daneParafii, ...content]);
      }
    };

    fetchData();
    return () => {
      $("#maincontent").css({ height: "" });
    };
  }, []);

  useEffect(() => {
    if (!blockHome) {
      let height = $("#newsContent")[0].offsetHeight + 30;
      if (height > 30) {
        setStyle(740, height);
        $("#maincontent").css({ height: "" });
        blockHome = true;
      }
    }
  });

  return (
    <div id="newsContent" className="hghKeep">
      {content.map((post, index) => (
        <div key={post.id + index}>
          <News title={post.nazwa} date={post.data} content={post.tresc} />
          <Delimiter index={index} lastIndex={content.length - 1} />
        </div>
      ))}
    </div>
  );
}

export default Homepage;
