import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PdfDocument from "./pdfDocument";
import type { SetCurrentScreen } from "../../types";

function PdfReader({
  setCurrentScreen,
}: {
  setCurrentScreen: SetCurrentScreen;
}) {
  const { id } = useParams<{ id?: string }>();
  const url = `https://api.swanna.net.pl/api/files/${id || "none.pdf"}`;

  useEffect(() => {
    setCurrentScreen("ogloszenia");
  }, []);

  return (
    <div id="infoContent">
      <div id="infoContentButtons" style={{ justifyContent: "center" }}>
        <a href={url} target="_blank" className="btn btn-warning">
          Link bezpośredni
        </a>
      </div>
      <PdfDocument url={url} />
    </div>
  );
}

export default PdfReader;
