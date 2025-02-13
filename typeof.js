function typeOf(value) {
  // Handle null case
  if (value === null) {
    return "object"; // Special case for null
  }

  // Use Object.prototype.toString.call() to detect types
  const type = Object.prototype.toString.call(value);

  // Handle different cases with switch
  switch (type) {
    case "[object String]":
      return "string";
    case "[object Number]":
      return isNaN(value) ? "NaN" : "number"; // Check if the number is NaN
    case "[object Boolean]":
      return "boolean";
    case "[object Undefined]":
      return "undefined";
    case "[object Symbol]":
      return "symbol"; // Handle symbols
    case "[object Function]":
      return "function"; // Handle functions (regular and arrow)
    case "[object Array]":
      return "array"; // Handle arrays
    case "[object Date]":
      return "date"; // Handle Date objects
    case "[object RegExp]":
      return "regexp"; // Handle RegExp objects
    default:
      return "object"; // All other objects (e.g., plain objects)
  }
}

/**
 * console.log(typeOf(42)); // 'number'
 * console.log(typeOf('hello')); // 'string'
 * console.log(typeOf(true)); // 'boolean'
 * console.log(typeOf(undefined)); // 'undefined'
 * console.log(typeOf(Symbol('id'))); // 'symbol'
 * console.log(typeOf(function() {})); // 'function'
 * console.log(typeOf(null)); // 'object'
 * console.log(typeOf({})); // 'object'
 * console.log(typeOf([])); // 'array'
 * console.log(typeOf(new Date())); // 'date'
 * console.log(typeOf(/regex/)); // 'regexp'
 * console.log(typeOf(NaN)); // 'NaN'
 */
