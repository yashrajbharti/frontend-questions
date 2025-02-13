function customObjectAssign(target, ...sources) {
  if (target == null) {
    throw new TypeError("Target cannot be null or undefined");
  }

  // Convert target to an object if it is not already one
  const to = Object(target);

  sources.forEach((source) => {
    if (source != null) {
      // Convert source to an object if it is not already one
      const from = Object(source);

      Object.keys(from).forEach((key) => {
        // Copy properties from source to target
        to[key] = from[key];
      });
    }
  });

  return to;
}

/**
 * const target = { a: 1, b: 2 };
 * const source1 = { b: 3, c: 4 };
 * const source2 = { d: 5 };
 *
 * const result = customObjectAssign(target, source1, source2);
 *
 * console.log(result); // Output: { a: 1, b: 3, c: 4, d: 5 }
 */
