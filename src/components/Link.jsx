import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import $ from "jquery";

function Link({ to, children, className }) {
  const history = useHistory();
  const handleClick = (e) => {
    if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      $("#fade").removeClass("fadein");
      $("#fade").addClass("fadeout");

      setTimeout(() => {
        history.push(to);
      }, 200);
    }
  };
  return (
    <a className={className} onClick={handleClick} href={to}>
      {children}
    </a>
  );
}

export default Link;
