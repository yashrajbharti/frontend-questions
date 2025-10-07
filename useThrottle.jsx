/**
 * useThrottle Hook
 * 
 * Create a custom hook that throttles a value. The throttled value will update
 * at most once per the specified limit period.
 * 
 * Useful for scroll handlers, mouse move events, etc.
 * 
 * @param {*} value - The value to throttle
 * @param {number} limit - The minimum time between updates in milliseconds
 * @returns {*} - The throttled value
 */

import { useState, useEffect, useRef } from 'react';

function useThrottle(value, limit) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
}

// Alternative implementation with callback
function useThrottleCallback(callback, delay) {
  const lastRan = useRef(Date.now());

  return useCallback((...args) => {
    if (Date.now() - lastRan.current >= delay) {
      callback(...args);
      lastRan.current = Date.now();
    }
  }, [callback, delay]);
}

// Example usage: Scroll position tracking
function ScrollTracker() {
  const [scrollY, setScrollY] = React.useState(0);
  const throttledScrollY = useThrottle(scrollY, 200);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ height: '200vh' }}>
      <div style={{ position: 'fixed', top: 0 }}>
        <p>Current scroll: {scrollY}px</p>
        <p>Throttled scroll: {throttledScrollY}px (updates every 200ms)</p>
      </div>
    </div>
  );
}

export default useThrottle;
