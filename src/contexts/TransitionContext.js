import React from "react";

const TransitionContext = React.createContext();

export const TransitionProvider = ({ children }) => {
  const [transitioning, setTransitioning] = React.useState(false);

  return (
    <TransitionContext.Provider value={{ transitioning, setTransitioning }}>
      {children}
    </TransitionContext.Provider>
  );
};

export default TransitionContext;
