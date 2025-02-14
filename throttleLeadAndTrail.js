function throttle(fn, delay, { leading = true, trailing = true } = {}) {
  let lastExecutedTime = 0;
  let timer = null;
  let lastArgs = null;
  let lastContext = null;

  return function (...args) {
    const now = Date.now();
    const remainingTime = delay - (now - lastExecutedTime);
    lastArgs = args;
    lastContext = this;

    if (remainingTime <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      if (leading) {
        fn.apply(lastContext, lastArgs);
        lastExecutedTime = now;
      }
    } else if (trailing && !timer) {
      timer = setTimeout(() => {
        if (trailing && lastArgs) {
          fn.apply(lastContext, lastArgs);
        }
        lastExecutedTime = Date.now();
        timer = null;
        lastArgs = lastContext = null;
      }, remainingTime);
    }
  };
}

// const log = (msg) => console.log(`${new Date().toISOString()} - ${msg}`);

// const throttledLog = throttle(log, 2000, { leading: true, trailing: true });

// throttledLog("Call 1"); // Executes immediately (leading)
// setTimeout(() => throttledLog("Call 2"), 500); // Ignored
// setTimeout(() => throttledLog("Call 3"), 2500); // Executes after delay (trailing)
// setTimeout(() => throttledLog("Call 4"), 4000); // Executes immediately (new leading)
