// PIPE

const pipe =
  (...fns) =>
  (initialValue) =>
    fns.reduce((acc, fn) => fn(acc), initialValue);

// // Example Usage
// const add5 = (x) => x + 5;
// const multiplyBy2 = (x) => x * 2;
// const subtract3 = (x) => x - 3;

// const pipedFunction = pipe(add5, multiplyBy2, subtract3);
// console.log(pipedFunction(5)); // Output: 17

// COMPOSE

const compose =
  (...fns) =>
  (initialValue) =>
    fns.reduceRight((acc, fn) => fn(acc), initialValue);

// // Example Usage
// const composedFunction = compose(subtract3, multiplyBy2, add5);
// console.log(composedFunction(5)); // Output: 17
