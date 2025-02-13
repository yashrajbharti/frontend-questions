function customSetInterval(callback, delay) {
  let start = Date.now();
  let timerId;

  function loop() {
    timerId = requestAnimationFrame(loop);
    if (Date.now() - start >= delay) {
      start = Date.now();
      callback();
    }
  }

  loop();

  return {
    clear: () => cancelAnimationFrame(timerId),
  };
}

/**
 * // Example usage:
 *
 * const interval = customSetInterval(() => console.log("Repeated execution"),1000);
 *
 * setTimeout(() => interval.clear(), 5000); // Stops after 5 seconds
 *
 */
