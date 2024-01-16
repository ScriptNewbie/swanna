import React, { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import TransitionContext from "../contexts/TransitionContext";

function Link({ to, children, className }) {
  const history = useHistory();
  const { setTransitioning } = useContext(TransitionContext);
  const handleClick = (e) => {
    if (!to.startsWith("/")) return;
    if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setTransitioning(true);
      setTimeout(() => {
        history.push(to);
        setTransitioning(false);
      }, 200);
    }
  };

  return (
    <a className={className} onClick={handleClick} href={to} target="_blank">
      {children}
    </a>
  );
}

export default Link;
