import { useMemo, useState, useEffect } from "react";
import "./snow.css";

export const Snow = () => {
  const [isSnowing, setIsSnowing] = useState(true);
  const [isNarrowScreen, setIsNarrowScreen] = useState(
    window.innerWidth < window.innerHeight
  );

  useEffect(() => {
    const handleResize = () => {
      setIsNarrowScreen(window.innerWidth < window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const snowflakes = useMemo(() => {
    const snowflakeCount = isNarrowScreen ? 20 : 50; // 20 for narrow screens, 50 for wide

    return Array.from({ length: snowflakeCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // Random horizontal position (0-100%)
      animationDuration: 5 + Math.random() * 10, // Duration between 5-15 seconds
      animationDelay: Math.random() * 5, // Random delay to stagger start
      fontSize: 10 + Math.random() * 20, // Size between 10-30px
      opacity: 0.3 + Math.random() * 0.7, // Opacity between 0.3-1.0
    }));
  }, [isNarrowScreen]);

  return (
    <>
      <button
        className="btn btn-secondary snow-toggle"
        onClick={() => setIsSnowing(!isSnowing)}
      >
        <div>❄</div>
      </button>
      {isSnowing && (
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
      )}
    </>
  );
};
