/**
 * useWindowSize Hook
 *
 * Create a custom hook that tracks the window dimensions and updates
 * when the window is resized.
 *
 * @returns {Object} - Returns { width, height }
 */

import { useState, useEffect } from "react";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

// Example usage: Display window dimensions
function WindowDimensions() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Window width: {width}px</p>
      <p>Window height: {height}px</p>
    </div>
  );
}

// Example: Conditional rendering based on size
function ResponsiveComponent() {
  const { width } = useWindowSize();

  return (
    <div>
      {width < 768 ? (
        <MobileView />
      ) : width < 1024 ? (
        <TabletView />
      ) : (
        <DesktopView />
      )}
    </div>
  );
}

// Example: Calculate grid columns based on width
function DynamicGrid({ children }) {
  const { width } = useWindowSize();

  const columns = width < 600 ? 1 : width < 900 ? 2 : width < 1200 ? 3 : 4;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: "1rem",
      }}
    >
      {children}
    </div>
  );
}

export default useWindowSize;
