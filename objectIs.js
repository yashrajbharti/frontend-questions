function customObjectIs(x, y) {
  if (x === y) {
    // Special case: Handle -0 and +0 differently
    return x !== 0 || 1 / x === 1 / y;
  }
  // Special case: Handle NaN
  return x !== x && y !== y; // NaN is the only value in JS that is not equal to itself
}

// console.log(customObjectIs(42, 42));      // true
// console.log(customObjectIs("hello", "hello")); // true
// console.log(customObjectIs({}, {}));      // false (different object references)
// console.log(customObjectIs(NaN, NaN));    // true (unlike ===, which gives false)
// console.log(customObjectIs(-0, +0));      // false (unlike ===, which gives true)
// console.log(customObjectIs(null, null));  // true
// console.log(customObjectIs(undefined, undefined)); // true
// console.log(customObjectIs([], []));      // false (different array references)
