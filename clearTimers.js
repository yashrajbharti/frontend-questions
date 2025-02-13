const TimerManager = (() => {
  let timers = new Set(); // Stores active timer IDs

  return {
    setTimeout: (callback, delay) => {
      const id = setTimeout(() => {
        timers.delete(id); // Remove once executed
        callback();
      }, delay);
      timers.add(id);
      return id;
    },

    setInterval: (callback, delay) => {
      const id = setInterval(callback, delay);
      timers.add(id);
      return id;
    },

    clearTimeout: (id) => {
      clearTimeout(id);
      timers.delete(id);
    },

    clearInterval: (id) => {
      clearInterval(id);
      timers.delete(id);
    },

    clearAllTimers: () => {
      for (let id of timers) {
        clearTimeout(id);
        clearInterval(id);
      }
      timers.clear(); // Remove all stored IDs
    },
  };
})();

/**
 *
 * const timer1 = TimerManager.setTimeout(() => console.log("Timeout 1"), 2000);
 * const timer2 = TimerManager.setInterval(() => console.log("Interval"), 1000);
 * const timer3 = TimerManager.setTimeout(() => console.log("Timeout 2"), 3000);
 *
 * setTimeout(() => {
 *  console.log("Clearing all timers...");
 *  TimerManager.clearAllTimers();
 * }, 2500);
 *
 */
