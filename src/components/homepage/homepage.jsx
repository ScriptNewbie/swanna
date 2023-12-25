import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./homepage.css";
import News from "./news";
import Delimiter from "./delimiter";
import Link from "../Link";

let elements = [];

function Homepage({ setCurrentScreen, adjustHeight }) {
  const contentPlace = useRef(null);
  const [content, setContent] = useState([]);

  const handleResize = () => {
    adjustHeight(contentPlace.current.scrollHeight);
  };

  useEffect(() => {
    setCurrentScreen("homepage");

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

    fetchData().finally(() => {
      const newsContent = document.getElementById("newsContent");
      if (newsContent) {
        elements = newsContent.querySelectorAll("[data-destination]");
        //Polega na funkcji wyeksportowanej do windowa w komponencie Link
        elements.forEach(function (element) {
          const clickHandler = (e) => {
            window.reactNavigate(e, element.dataset.destination);
          };

          element.addEventListener("click", clickHandler);
          element._clickHandler = clickHandler;
        });
      }

      adjustHeight(contentPlace.current.scrollHeight);
      window.addEventListener("resize", handleResize);
    });

    return () => {
      elements.forEach(function (element) {
        element.removeEventListener("click", element._clickHandler);
      });
      elements = [];
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id="newsContent" className="center" ref={contentPlace}>
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
