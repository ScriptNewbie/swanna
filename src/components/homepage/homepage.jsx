import React, { useEffect, useRef } from "react";
import "./homepage.css";
import News from "./news";
import Delimiter from "./delimiter";
import Link, { navigate } from "../Link";
import useNews from "../../hooks/useNews";

let elements = [];

const daneParafii = {
  id: -1,
  nazwa: "Dane Parafii",
  data: "Przypięty",
  tresc: (
    <p>
      Dane parafii tj. adres, telefon czy numer konta bankowego znajdziesz na
      podstronie <Link to="/kontakt">kontakt!</Link>
    </p>
  ),
};

const error = {
  nazwa: "Błąd połączenia z bazą danych",
  data: "01/01/1970",
  tresc:
    "Z powodu błędu połączenia z bazą danych wyświetlenie aktualności jest niemożliwe. Pozostałe podstrony powinny działać poprawnie.",
};

function Homepage({ setCurrentScreen, adjustHeight }) {
  const content = useRef(null);

  const { data, isError, isSuccess } = useNews();
  const news = isSuccess ? [...data] : [];
  news.unshift(daneParafii);
  if (isError) news.push(error);

  const handleResize = () => {
    adjustHeight(content.current.scrollHeight);
  };

  useEffect(() => {
    const cleanup = () => {
      elements.forEach(function (element) {
        element.removeEventListener("click", element._clickHandler);
      });
      elements = [];
    };
    cleanup();

    const newsContent = document.getElementById("newsContent");
    if (newsContent) {
      elements = newsContent.querySelectorAll("[data-destination]");
      elements.forEach(function (element) {
        const clickHandler = (e) => {
          navigate(e, element.dataset.destination);
        };

        element.addEventListener("click", clickHandler);
        element._clickHandler = clickHandler;
      });
    }

    adjustHeight(content.current.scrollHeight);

    return cleanup;
  }, [news]);

  useEffect(() => {
    setCurrentScreen("homepage");

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id="newsContent" className="center" ref={content}>
      {news.map((post, index) => (
        <div key={post.id + index}>
          <News title={post.nazwa} date={post.data} content={post.tresc} />
          <Delimiter index={index} lastIndex={news.length - 1} />
        </div>
      ))}
    </div>
  );
}

export default Homepage;
