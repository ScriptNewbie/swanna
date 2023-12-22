import React from "react";

const FadeTransitionContext = React.createContext();

export const FadeTransitionProvider = ({ children }) => {
  const [transitioning, setTransitioning] = React.useState(false);

  return (
    <FadeTransitionContext.Provider value={{ transitioning, setTransitioning }}>
      {children}
    </FadeTransitionContext.Provider>
  );
};

export default FadeTransitionContext;
