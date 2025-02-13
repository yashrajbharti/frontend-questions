function omit(obj, keysToOmit) {
  if (typeof obj !== "object" || obj === null) {
    throw new TypeError("Expected an object as the first argument");
  }

  const result = {};
  const keysSet = new Set(
    Array.isArray(keysToOmit) ? keysToOmit : [keysToOmit]
  );

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && !keysSet.has(key)) {
      result[key] = obj[key];
    }
  }

  return result;
}

// Example Usage:
const data = {
  name: "John Doe",
  age: 30,
  email: "john@example.com",
  address: "123 Main St",
};

console.log(omit(data, "age"));
// Output: { name: 'John Doe', email: 'john@example.com', address: '123 Main St' }

console.log(omit(data, ["email", "address"]));
// Output: { name: 'John Doe', age: 30 }
