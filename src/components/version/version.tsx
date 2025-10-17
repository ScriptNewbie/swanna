import { useState } from "react";
import { useVersionQuery } from "./useVersionQuery";
import "./version.css";

const isOldVersion = (version: string) => {
  const current = import.meta.env.VITE_APP_VERSION;

  if (!version || !current) {
    return false;
  }
  const currentParts = current.split(".");
  const versionParts = version.split(".");
  for (let i = 0; i < currentParts.length; i++) {
    if (versionParts[i] > currentParts[i]) {
      return true;
    }
  }
  return false;
};

export const Version = () => {
  const { data: version } = useVersionQuery();
  const [closed, setClosed] = useState(false);

  const refresh = () => {
    // Force a hard reload that bypasses cache
    // Add timestamp to URL to force browser to refetch everything
    const url = new URL(window.location.href);
    url.searchParams.set("v", Date.now().toString());
    window.location.href = url.toString();
  };

  if (!isOldVersion(version) || closed) {
    return null;
  }

  return (
    <div className="frontend-app-version-container">
      <button
        className="frontend-app-version-close"
        onClick={() => setClosed(true)}
        aria-label="Zamknij"
      >
        ×
      </button>
      Wygląda na to, że używasz starej wersji aplikacji. <br /> Niektóre funkcje
      mogą nie działać poprawnie. <br />
      <span className="frontend-app-version-button" onClick={refresh}>
        Odśwież stronę aby załadować nową wersję.
      </span>
      <br />
      Jeśli po odświeżeniu strony nadal widzisz ten komunikat, skontaktuj się z
      nami.
    </div>
  );
};
