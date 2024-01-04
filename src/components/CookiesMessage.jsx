import React from "react";
import Link from "./Link";

function CookiesMessage() {
  return (
    <div style={{ textAlign: "center" }}>
      Musisz zaakceptować ciasteczka, by skorzystać z tej funkcji! <br />
      <br /> Aby to zrobić kliknij przycisk poniżej! <br />
      <br /> Przyciśnięcie przycisku jest równoznaczne z akceptajcą polityki
      cookies dostępnej <Link to="/cookies">na tej stronie</Link>.
    </div>
  );
}

export default CookiesMessage;
