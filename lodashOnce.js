function customOnce(fn) {
  let executed = false;
  let result;

  return function (...args) {
    if (!executed) {
      result = fn.apply(this, args);
      executed = true;
    }
    return result;
  };
}

// const initialize = customOnce(() => console.log("Initialized!"));

// initialize(); // Output: "Initialized!"
// initialize(); // No output
// initialize(); // No output
