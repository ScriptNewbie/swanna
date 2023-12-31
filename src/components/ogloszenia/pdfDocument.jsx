import React, { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";

function PdfDocument({
  url,
  ErrorComponent = () => (
    <div className="alert alert-light custom-alert" role="alert">
      Błąd podczas ładowania pliku!
    </div>
  ),
  transitioning = false,
}) {
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

  useEffect(() => {
    setLoaded(false);
    setWasError(false);
  }, [url]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setLoaded(true);
  }

  const handleResize = () => {
    setScale(getScale);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id="pdf" className={loaded && !transitioning ? "pdfLoaded" : ""}>
      {wasError ? (
        <ErrorComponent />
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
  );
}

export default PdfDocument;
