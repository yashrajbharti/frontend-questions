function set(obj, path, value) {
  if (typeof obj !== "object" || obj === null) {
    throw new TypeError("Expected an object as the first argument");
  }

  // Convert path to an array (handles both string and array input)
  const keys = Array.isArray(path)
    ? path
    : path.replace(/\[(\d+)]/g, ".$1").split(".");
  let current = obj;

  keys.forEach((key, index) => {
    const isLastKey = index === keys.length - 1;

    if (!isLastKey) {
      // If the next key is a number, create an array; otherwise, create an object
      if (!(key in current)) {
        current[key] = isNaN(keys[index + 1]) ? {} : [];
      }
      current = current[key]; // Move deeper
    } else {
      current[key] = value; // Set the value
    }
  });

  return obj;
}

/**
 * // Example Usage:
 * const data = { user: { profile: { name: 'John Doe' } } };
 *
 * set(data, 'user.profile.age', 30);
 * console.log(data); // { user: { profile: { name: 'John Doe', age: 30 } } }
 *
 * set(data, 'user.hobbies[1]', 'gaming');
 * console.log(data); // { user: { profile: { name: 'John Doe', age: 30 }, hobbies: [ <empty>, 'gaming' ] } }
 *
 * set(data, ['user', 'address', 'street'], '123 Main St');
 * console.log(data); // { user: { profile: { ... }, hobbies: [...], address: { street: '123 Main St' } } }
 *
 */
