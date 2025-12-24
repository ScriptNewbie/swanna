import { useMemo } from "react";
import "./snow.css";

export const Snow = () => {
  const snowflakes = useMemo(() => {
    const snowflakeCount = 50; // Number of snowflakes

    return Array.from({ length: snowflakeCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // Random horizontal position (0-100%)
      animationDuration: 5 + Math.random() * 10, // Duration between 5-15 seconds
      animationDelay: Math.random() * 5, // Random delay to stagger start
      fontSize: 10 + Math.random() * 20, // Size between 10-30px
      opacity: 0.3 + Math.random() * 0.7, // Opacity between 0.3-1.0
    }));
  }, []);

  return (
    <div className="snow">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.animationDelay}s`,
            fontSize: `${flake.fontSize}px`,
            opacity: flake.opacity,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
};
