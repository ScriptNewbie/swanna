import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PdfDocument from "./pdfDocument";

function PdfReader({ setCurrentScreen }) {
  const { id } = useParams();
  const url = "https://api.swanna.net.pl/files/" + id || "none.pdf";

  useEffect(() => {
    setCurrentScreen("ogloszenia");
  }, []);

  return (
    <div id="infoContent">
      <div id="infoContentButtons" style={{ justifyContent: "center" }}>
        <a type="button" href={url} target="_blank" className="btn btn-warning">
          Link bezpośredni
        </a>
      </div>
      <PdfDocument url={url} />
    </div>
  );
}

export default PdfReader;
