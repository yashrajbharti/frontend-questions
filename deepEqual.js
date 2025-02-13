function deepEqual(obj1, obj2) {
  // Check if both values are strictly equal
  if (obj1 === obj2) {
    return true;
  }

  // Check if either value is not an object or is null
  if (
    obj1 == null ||
    obj2 == null ||
    typeof obj1 !== "object" ||
    typeof obj2 !== "object"
  ) {
    return false;
  }

  // Get the keys of both objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if the number of keys is different
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Check if all keys and values are equal
  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

/**
 *
 * const obj1 = {
 *   name: 'John',
 *   age: 30,
 *   address: {
 *     city: 'New York',
 *     zip: '10001'
 *   }
 * };
 *
 * const obj2 = {
 *   name: 'John',
 *   age: 30,
 *   address: {
 *     city: 'New York',
 *     zip: '10001'
 *   }
 * };
 *
 * const obj3 = {
 *   name: 'Jane',
 *   age: 25,
 *   address: {
 *     city: 'New York',
 *     zip: '10002'
 *   }
 * };
 *
 * console.log(deepEqual(obj1, obj2)); // Output: true
 * console.log(deepEqual(obj1, obj3)); // Output: false
 *
 */
