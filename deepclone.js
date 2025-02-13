function deepClone(value, weakMap = new WeakMap()) {
  // Handle primitives and functions
  if (value === null || typeof value !== "object") return value;
  if (typeof value === "function") return value.bind({}); // Clone functions (shallow)

  // Handle cyclic references using WeakMap
  if (weakMap.has(value)) return weakMap.get(value);

  // Handle Date
  if (value instanceof Date) return new Date(value.getTime());

  // Handle RegExp
  if (value instanceof RegExp) return new RegExp(value.source, value.flags);

  // Handle Symbols (shallow copy)
  if (typeof value === "symbol") return Symbol(value.description);

  // Handle Array
  if (Array.isArray(value)) {
    const copy = [];
    weakMap.set(value, copy);
    value.forEach((item, index) => {
      copy[index] = deepClone(item, weakMap);
    });
    return copy;
  }

  // Handle Objects
  const copy = Object.create(Object.getPrototypeOf(value));
  weakMap.set(value, copy);
  Object.keys(value).forEach((key) => {
    copy[key] = deepClone(value[key], weakMap);
  });

  // Handle Symbols as keys
  Object.getOwnPropertySymbols(value).forEach((sym) => {
    copy[sym] = deepClone(value[sym], weakMap);
  });

  return copy;
}

/**
 *
 *
 * const obj = {
 *   name: "Yash",
 *   age: 25,
 *   nested: {
 *     key: "value",
 *     arr: [1, 2, { num: 3 }],
 *   },
 *   date: new Date(),
 *   regex: /hello/i,
 *   func: function () {
 *     return "Hello";
 *   },
 *   symbol: Symbol("test"),
 * };
 *
 * obj.circular = obj; // Adding circular reference
 *
 * const clonedObj = deepClone(obj);
 * console.log(clonedObj);
 * console.log(clonedObj === obj); // false (not the same reference)
 * console.log(clonedObj.nested === obj.nested); // false (deep copied)
 * console.log(clonedObj.date === obj.date); // false (new Date instance)
 * console.log(clonedObj.regex === obj.regex); // false (new RegExp instance)
 * console.log(clonedObj.func()); // "Hello"
 * console.log(clonedObj.symbol === obj.symbol); // false (new Symbol)
 *
 */
