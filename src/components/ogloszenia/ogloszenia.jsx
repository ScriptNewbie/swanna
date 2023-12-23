import React, { useEffect, useState, useRef } from "react";
import "react-pdf/dist/Page/TextLayer.css";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import "./ogloszenia.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

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
  const contentArea = useRef(null);

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

  return (
    <div
      ref={contentArea}
      id="infoContent"
      className={loaded ? "infoContentLoaded" : ""}
    >
      <Document
        file="https://api.swanna.net.pl/ogloszenia/ogloszenia.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
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
    </div>
  );
}

export default Ogloszenia;
