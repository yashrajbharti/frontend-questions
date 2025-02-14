function debounce(fn, delay, { leading = false, trailing = true } = {}) {
  let timer = null;
  let lastArgs = null;
  let lastContext = null;
  let isLeadingCalled = false;

  return function (...args) {
    lastArgs = args;
    lastContext = this;

    const invokeFunction = () => {
      if (trailing && lastArgs) {
        fn.apply(lastContext, lastArgs);
      }
      isLeadingCalled = false;
      lastArgs = lastContext = null;
    };

    if (leading && !isLeadingCalled) {
      fn.apply(lastContext, lastArgs);
      isLeadingCalled = true;
    }

    clearTimeout(timer);
    timer = setTimeout(invokeFunction, delay);
  };
}

// // Example Usage:
// const log = (msg) => console.log(`${new Date().toISOString()} - ${msg}`);

// const debouncedLog = debounce(log, 1000, { leading: true, trailing: true });

// debouncedLog("Call 1"); // Executes immediately (leading)
// setTimeout(() => debouncedLog("Call 2"), 500); // Ignored
// setTimeout(() => debouncedLog("Call 3"), 1100); // Executes after delay (trailing)
// setTimeout(() => debouncedLog("Call 4"), 2500); // Executes immediately (new leading)
