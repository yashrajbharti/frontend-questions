function get(obj, path, defaultValue) {
  if (!obj || typeof obj !== "object") return defaultValue;

  // Convert path to an array (handles both string and array input)
  const keys = Array.isArray(path)
    ? path
    : path.replace(/\[(\d+)]/g, ".$1").split(".");

  // Traverse the object
  let result = obj;
  for (const key of keys) {
    // we check if the obj is empty, null, or undefined
    if (result == null || !(key in result)) {
      return defaultValue;
    }
    result = result[key];
  }

  return result;
}

/**
 *
 * // Example Usage:
 *
 * const data = {
 * user: {
 *   profile: {
 *     name: "John Doe",
 *     age: 30,
 *   },
 *   hobbies: ["reading", "gaming"],
 *  },
 * };
 *
 * console.log(get(data, "user.profile.name")); // Output: 'John Doe'
 * console.log(get(data, "user.profile.gender", "N/A")); // Output: 'N/A' (default value)
 * console.log(get(data, "user.hobbies[1]")); // Output: 'gaming'
 * console.log(get(data, ["user", "profile", "age"])); // Output: 30
 * console.log(get(data, "user.address.street", "Not Found")); // Output: 'Not Found'
 *
 */
