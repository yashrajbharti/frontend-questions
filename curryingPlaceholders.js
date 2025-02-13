function curry(fn) {
  return function curried(...args) {
    const relevantArgs = args.slice(0, fn.length);
    const hasPlaceholder = relevantArgs.includes(curry.placeholder);

    if (args.length >= fn.length && !hasPlaceholder) {
      return fn.apply(this, relevantArgs);
    }
    return (...nextArgs) => {
      return curried.apply(this, combineArgs(relevantArgs, nextArgs));
    };
  };
}

function combineArgs(args, nextArgs) {
  const trueArgs = args.reduce((acc, value) => {
    const nextArg =
      value === curry.placeholder && nextArgs.length > 0
        ? nextArgs.shift()
        : value;
    return [...acc, nextArg];
  }, []);
  return [...trueArgs, ...nextArgs];
}

curry.placeholder = Symbol();

/**
 * const sum = (a, b, c) => a + b + c;
 * const curriedSum = curry(sum);
 * console.log(curriedSum(1, 2, 3)); // Output: 6
 * console.log(curriedSum(1, curry.placeholder, 3)(2)); // Output: 6
 * console.log(curriedSum(curry.placeholder, 2)(1)(3)); // Output: 6
 */
