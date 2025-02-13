const pipe =
  (...fns) =>
  (initialValue) =>
    fns.reduce((acc, fn) => fn(acc), initialValue);

/**
 * const add5 = (x) => x + 5;
 * const multiplyBy2 = (x) => x * 2;
 * const subtract3 = (x) => x - 3;
 * const pipedFunction = pipe(add5, multiplyBy2, subtract3);
 * console.log(pipedFunction(5)); // Output: 17
 */
