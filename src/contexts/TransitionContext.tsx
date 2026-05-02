import React, { createContext, useContext, useState } from "react";

type TransitionContextType = {
  transitioning: boolean;
  setTransitioning: (value: boolean) => void;
};

const TransitionContext = createContext<TransitionContextType | undefined>(
  undefined,
);

export const TransitionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transitioning, setTransitioning] = useState(false);

  return (
    <TransitionContext.Provider value={{ transitioning, setTransitioning }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransitionContext = (): TransitionContextType => {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error(
      "useTransitionContext must be used within a TransitionProvider",
    );
  }
  return context;
};
