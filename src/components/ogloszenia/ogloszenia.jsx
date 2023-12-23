import React, { useEffect, useState, useRef } from "react";
import "react-pdf/dist/Page/TextLayer.css";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import "./ogloszenia.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

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
  const contentArea = useRef(null);
  const [wasError, setWasError] = useState(false);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setLoaded(true);
  }

  function onPageLoad({ _pageIndex, width }) {
    console.log(contentArea.current.clientWidth);
    console.log(width);
  }
  const handleResize = () => {
    setScale(getScale);
  };

  useEffect(() => {
    setCurrentScreen("ogloszenia");
    window.addEventListener("resize", handleResize);

    return () => {
      return () => window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log(urls[current]);
  return (
    <div ref={contentArea} id="infoContent">
      <div id="infoContentButtons">
        <button type="button" className="btn btn-danger">
          Mam problem
        </button>
        <button
          onClick={() => {
            document.getElementById("infoBtnText").style.opacity = 0;
            setLoaded(false);
            setTimeout(() => {
              setWasError(false);
              setCurrent((current + 1) % 2);
              document.getElementById("infoBtnText").style.opacity = 1;
            }, 200);
          }}
          type="button"
          className="btn btn-success"
        >
          <span id="infoBtnText">
            {current === 0 ? "Następny tydzień" : "Poprzedni tydzień"}
          </span>
        </button>
      </div>
      <div id="pdf" className={loaded ? "pdfLoaded" : ""}>
        {wasError ? (
          <div className="alert alert-light" role="alert">
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
              <>
                <Page
                  renderAnnotationLayer={false}
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  onLoadSuccess={onPageLoad}
                  scale={scale}
                />
                <br />
              </>
            ))}
          </Document>
        )}
      </div>
    </div>
  );
}

export default Ogloszenia;
