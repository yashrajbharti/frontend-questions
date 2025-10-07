/**
 * useMediaQuery Hook
 *
 * Create a custom hook that tracks whether a media query matches.
 * Useful for responsive designs and conditional rendering based on screen size.
 *
 * @param {string} query - The media query string (e.g., '(min-width: 768px)')
 * @returns {boolean} - Whether the media query matches
 */

import { useState, useEffect } from "react";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    // Update state when media query changes
    const handleChange = (event) => {
      setMatches(event.matches);
    };

    // Set initial value
    setMatches(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

// Example usage: Responsive layout
function ResponsiveLayout() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div>
      {isMobile && <MobileLayout />}
      {isTablet && <TabletLayout />}
      {isDesktop && <DesktopLayout />}
    </div>
  );
}

// Example: Dark mode preference
function ThemeDetector() {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <div style={{ background: prefersDark ? "#333" : "#fff" }}>
      <p>Current theme: {prefersDark ? "Dark" : "Light"}</p>
    </div>
  );
}

// Example: Orientation
function OrientationAware() {
  const isPortrait = useMediaQuery("(orientation: portrait)");

  return (
    <div>
      <p>Device orientation: {isPortrait ? "Portrait" : "Landscape"}</p>
    </div>
  );
}

export default useMediaQuery;
