function chunk(array, size = 1) {
  if (!Array.isArray(array) || size < 1) {
    throw new Error(
      "Invalid input: array must be an array and size must be >= 1"
    );
  }

  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
}

/**
 *
 * console.log(chunk([1, 2, 3, 4, 5], 2)); // [[1, 2], [3, 4], [5]]
 * console.log(chunk([1, 2, 3, 4, 5], 3)); // [[1, 2, 3], [4, 5]]
 * console.log(chunk([1, 2, 3, 4, 5], 1)); // [[1], [2], [3], [4], [5]]
 * console.log(chunk([1, 2, 3, 4, 5], 10)); // [[1, 2, 3, 4, 5]]
 * console.log(chunk([], 2)); // []
 *
 */
