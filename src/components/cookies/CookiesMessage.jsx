import React from "react";
import Link from "../Link";

function CookiesMessage({ onNavigateToPolicy = () => {} }) {
  return (
    <div style={{ textAlign: "center" }}>
      Musisz zaakceptować ciasteczka, by skorzystać z tej funkcji! <br />
      <br /> Aby to zrobić kliknij przycisk poniżej! <br />
      <br /> Przyciśnięcie przycisku jest równoznaczne z akceptajcą polityki
      cookies dostępnej{" "}
      <Link to="/cookies">
        <span onClick={onNavigateToPolicy}>na tej stronie</span>
      </Link>
      .
    </div>
  );
}

export default CookiesMessage;
