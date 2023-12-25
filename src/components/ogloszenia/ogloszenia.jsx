import React, { useEffect, useState } from "react";
import "react-pdf/dist/Page/TextLayer.css";

import { Document, Page } from "react-pdf";
import "./ogloszenia.css";
import Problem from "./problem";
import Link from "../Link";

const urls = [
  "https://api.swanna.net.pl/ogloszenia/ogloszenia.pdf",
  "https://api.swanna.net.pl/ogloszenia/next.pdf",
];

function Ogloszenia({ setCurrentScreen }) {
  const getScale = () => {
    return window.matchMedia("(max-width: 500px)").matches
      ? 0.55
      : window.matchMedia("(max-width: 750px)").matches
      ? 0.8
      : 1.2;
  };
  const [numPages, setNumPages] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [scale, setScale] = useState(getScale());
  const [current, setCurrent] = useState(0);

  const [wasError, setWasError] = useState(false);
  const [problemVisible, setProblemVisible] = useState(false);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setLoaded(true);
  }

  const handleResize = () => {
    setScale(getScale);
  };

  useEffect(() => {
    setCurrentScreen("ogloszenia");
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const nextWeek = () => {
    document.getElementById("infoBtnText").style.opacity = 0;
    setLoaded(false);
    setTimeout(() => {
      setWasError(false);
      setCurrent((current + 1) % 2);
      document.getElementById("infoBtnText").style.opacity = 1;
    }, 200);
  };
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
        <Link
          to="/pdf/koleda2324_rc1.pdf"
          type="button"
          className="btn btn-warning"
        >
          Plan kolędy
        </Link>
        <button onClick={nextWeek} type="button" className="btn btn-success">
          <span id="infoBtnText">
            {current === 0 ? "Następny tydzień" : "Poprzedni tydzień"}
          </span>
        </button>
      </div>
      <div id="pdf" className={loaded ? "pdfLoaded" : ""}>
        {wasError ? (
          <div className="alert alert-light custom-alert" role="alert">
            {current === 0
              ? "Nie udało się załadować ogłoszeń!"
              : "Nie udało się załadować ogłoszeń z przyszłego tygodnia. Prawdopodobnie nie są one jeszcze dostępne. Ogłoszenia z przyszłego tygodnia pojawiają się przeważnie w piątek wieczorem."}
          </div>
        ) : (
          <Document
            file={urls[current]}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={() => {
              setWasError(true);
              setLoaded(true);
            }}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <div key={`page_${index + 1}`}>
                <Page
                  renderAnnotationLayer={false}
                  pageNumber={index + 1}
                  scale={scale}
                />
                <br />
              </div>
            ))}
          </Document>
        )}
      </div>
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
