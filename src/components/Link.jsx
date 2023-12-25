import React, { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import TransitionContext from "../contexts/TransitionContext";

export let navigate = (e, destination) => {};

function Link({ to, children, className }) {
  const history = useHistory();
  const { setTransitioning } = useContext(TransitionContext);
  const handleClick = (e, destination = to) => {
    if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setTransitioning(true);
      setTimeout(() => {
        history.push(destination);
        setTransitioning(false);
      }, 200);
    }
  };

  navigate = handleClick;

  return (
    <a className={className} onClick={handleClick} href={to}>
      {children}
    </a>
  );
}

export default Link;
