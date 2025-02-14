function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return (...nextArgs) => curried(...args, ...nextArgs);
    }
  };
}

// // Example Usage
// function add(a, b, c) {
//   return a + b + c;
// }

// const curriedAdd = curry(add);

// console.log(curriedAdd(1)(2)(3)); // Output: 6
// console.log(curriedAdd(1, 2)(3)); // Output: 6
// console.log(curriedAdd(1)(2, 3)); // Output: 6
