function customSetTimeout(callback, delay) {
  return new Promise((resolve) => {
    const start = Date.now();
    function checkTime() {
      if (Date.now() - start >= delay) {
        callback();
        resolve();
      } else {
        requestAnimationFrame(checkTime);
      }
    }
    requestAnimationFrame(checkTime);
  });
}

/**
 * // Example usage:
 * customSetTimeout(() => console.log("Executed after delay"), 2000);
 *
 */
