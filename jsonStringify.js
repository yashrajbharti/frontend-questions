function jsonStringify(value, seen = new Set()) {
  // Handle primitive types (string, number, boolean, null)
  if (typeof value === "string") {
    return `"${value}"`;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (value === null) {
    return "null";
  }

  // Handle Symbol values (return undefined, meaning they will be skipped)
  if (typeof value === "symbol") {
    return undefined; // Symbols are not serialized in JSON
  }

  // Handle Date objects
  if (value instanceof Date) {
    return `"${value.toISOString()}"`;
  }

  // Handle arrays
  if (Array.isArray(value)) {
    const arrayValues = value.map((item) => jsonStringify(item, seen));
    return `[${arrayValues.filter((v) => v !== undefined).join(",")}]`;
  }

  // Handle objects (check for circular references)
  if (typeof value === "object") {
    if (seen.has(value)) {
      throw new TypeError("Converting circular structure to JSON");
    }
    seen.add(value);

    const keys = Object.keys(value); // Object.keys ignores Symbol keys
    const objectValues = keys
      .map((key) => {
        const keyValue = jsonStringify(value[key], seen);
        if (keyValue !== undefined) {
          // Exclude undefined (Symbol values)
          return `"${key}":${keyValue}`;
        }
      })
      .filter(Boolean); // Remove undefined entries
    return `{${objectValues.join(",")}}`;
  }

  // Handle functions and undefined (omit them)
  if (typeof value === "function" || typeof value === "undefined") {
    return undefined;
  }
}

/**
 *
 * const sym1 = Symbol("id");
 * const obj = {
 * name: "John",
 * age: 30,
 * [sym1]: "symbolValue", // Symbol as key should be ignored
 * isEmployed: true,
 * hobbies: ["reading", "sports"],
 * favoriteSymbol: Symbol("symbolValue"), // Symbol as value should be omitted
 * address: {
 *   city: "New York",
 *   zip: "10001",
 * },
 * spouse: null,
 * };
 *
 * const jsonString = jsonStringify(obj);
 * console.log(jsonString);
 * // Output: {"name":"John","age":30,"isEmployed":true,"hobbies":["reading","sports"],"address":{"city":"New York","zip":"10001"},"spouse":null}
 *
 */
