const memoizeLast = (fn) => {
  let lastArgs = null;
  let lastResult = null;

  return (...args) => {
    if (
      lastArgs &&
      args.length === lastArgs.length &&
      args.every((arg, i) => arg === lastArgs[i])
      // check if all args are same
    ) {
      return lastResult;
    }
    lastArgs = args;
    lastResult = fn(...args);
    return lastResult;
  };
};

// const add = (a, b) => {
//   console.log(`Computing: ${a} + ${b}`);
//   return a + b;
// };

// const memoizedAdd = memoizeLast(add);

// console.log(memoizedAdd(2, 3)); // Computing: 2 + 3 → 5
// console.log(memoizedAdd(2, 3)); // Cached → 5
// console.log(memoizedAdd(3, 2)); // Computing: 3 + 2 → 5 (New arguments)
// console.log(memoizedAdd(3, 2)); // Cached → 5
