import React, { useEffect, useState } from "react";
import "react-pdf/dist/Page/TextLayer.css";

import "./ogloszenia.css";
import Problem from "./problem";
import Link from "../Link";
import PdfDocument from "./pdfDocument";

const urls = [
  "https://api.swanna.net.pl/ogloszenia/ogloszenia.pdf",
  "https://api.swanna.net.pl/ogloszenia/next.pdf",
];

function Ogloszenia({ setCurrentScreen }) {
  const [current, setCurrent] = useState(0);
  const [problemVisible, setProblemVisible] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    setCurrentScreen("ogloszenia");
  }, []);

  const nextWeek = () => {
    setTransitioning(true);
    setTimeout(() => {
      setTransitioning(false);
      setCurrent((current + 1) % 2);
    }, 200);
  };

  const ErrorComponent = () => (
    <div className="alert alert-light custom-alert" role="alert">
      {current === 0
        ? "Nie udało się załadować ogłoszeń!"
        : "Nie udało się załadować ogłoszeń z przyszłego tygodnia. Prawdopodobnie nie są one jeszcze dostępne. Ogłoszenia z przyszłego tygodnia pojawiają się przeważnie w piątek wieczorem."}
    </div>
  );
  return (
    <div id="infoContent">
      <div id="infoContentButtons">
        <button
          type="button"
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#problemModal"
        >
          Mam problem
        </button>
        <button onClick={nextWeek} type="button" className="btn btn-success">
          <span id="infoBtnText" className={transitioning ? "invisible" : ""}>
            {current === 0 ? "Następny tydzień" : "Poprzedni tydzień"}
          </span>
        </button>
      </div>
      <PdfDocument
        transitioning={transitioning}
        url={urls[current]}
        ErrorComponent={ErrorComponent}
      />
      <Problem
        visible={problemVisible}
        setVisible={setProblemVisible}
        nextWeek={nextWeek}
        current={current}
      />
    </div>
  );
}

export default Ogloszenia;
