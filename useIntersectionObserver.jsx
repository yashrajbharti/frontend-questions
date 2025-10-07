/**
 * useIntersectionObserver Hook
 * 
 * Create a custom hook that uses the Intersection Observer API to detect
 * when an element enters or leaves the viewport.
 * 
 * Useful for lazy loading, infinite scroll, animations on scroll, etc.
 * 
 * @param {Object} options - IntersectionObserver options
 * @returns {Array} - Returns [ref, isIntersecting, entry]
 */

import { useState, useEffect, useRef } from 'react';

function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState(null);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      setEntry(entry);
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.root, options.rootMargin]);

  return [elementRef, isIntersecting, entry];
}

// Example usage: Lazy load image
function LazyImage({ src, alt }) {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
  });
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (isIntersecting && !imageSrc) {
      setImageSrc(src);
    }
  }, [isIntersecting, src, imageSrc]);

  return (
    <div ref={ref}>
      {imageSrc ? (
        <img src={imageSrc} alt={alt} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

// Example: Fade in animation
function FadeInSection({ children }) {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.5,
  });

  return (
    <div
      ref={ref}
      style={{
        opacity: isIntersecting ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
      }}
    >
      {children}
    </div>
  );
}

export default useIntersectionObserver;
