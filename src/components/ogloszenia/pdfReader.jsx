import React, { useEffect, useState } from "react";

import { Document, Page } from "react-pdf";
import { useParams } from "react-router-dom";

function PdfReader({ setCurrentScreen }) {
  const { id } = useParams();
  const url = "https://api.swanna.net.pl/files/" + id || "none.pdf";

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
  const [wasError, setWasError] = useState(false);

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

  return (
    <div id="infoContent">
      <div id="infoContentButtons" style={{ justifyContent: "center" }}>
        <a type="button" href={url} target="_blank" className="btn btn-warning">
          Link bezpośredni
        </a>
      </div>
      <div id="pdf" className={loaded ? "pdfLoaded" : ""}>
        {wasError ? (
          <div className="alert alert-light custom-alert" role="alert">
            Błąd podczas ładowania pliku!
          </div>
        ) : (
          <Document
            file={url}
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
    </div>
  );
}

export default PdfReader;
