const throttle = (fn, delay) => {
  let lastTime = 0;
  console.log("Called throttle immediately");
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastTime < delay) return;
    lastTime = now;
    fn(...args);
  };
};

/**
 * Example usage:
 * const log = throttle(console.log, 1000);
 * log('Hello'); // Logged immediately
 * log('World'); // Ignored if within 1000ms of the first call
 * log('Again'); // Ignored if within 1000ms
 * // After 1000ms, "Again" is logged
 */
