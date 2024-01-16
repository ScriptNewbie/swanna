import React, { useEffect, useRef } from "react";
import "./homepage.css";
import News from "./news";
import Delimiter from "./delimiter";
import useNews from "../../hooks/useNews";

const daneParafii = {
  id: -1,
  title: "Dane Parafii",
  publicationDate: "Przypięty",
  content:
    "Dane parafii tj. adres, telefon czy numer konta bankowego znajdziesz na podstronie [kontakt](/kontakt)!",
};

const error = {
  id: -2,
  title: "Błąd połączenia z bazą danych",
  publicationDate: "01/01/1970",
  content:
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
    adjustHeight(content.current.scrollHeight);
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
        <div key={post.id}>
          <News
            title={post.title}
            date={post.publicationDate}
            content={post.content}
          />
          <Delimiter index={index} lastIndex={news.length - 1} />
        </div>
      ))}
    </div>
  );
}

export default Homepage;
