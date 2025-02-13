const compose =
  (...fns) =>
  (initialValue) =>
    fns.reduceRight((acc, fn) => fn(acc), initialValue);

/**
 * const add5 = (x) => x + 5;
 * const multiplyBy2 = (x) => x * 2;
 * const subtract3 = (x) => x - 3;
 * const composedFunction = compose(subtract3, multiplyBy2, add5);
 * console.log(composedFunction(5)); // Output: 17
 */
