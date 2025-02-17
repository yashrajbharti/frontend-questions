// Includes
String.prototype.includes = function (search, start) {
  if (typeof start !== "number") {
    start = 0;
  }
  return this.indexOf(search, start) !== -1;
};

// // Example
// console.log("Hello World".includes("World")); // true

// Starts With
String.prototype.startsWith = function (search, start) {
  start = start || 0;
  return this.substring(start, start + search.length) === search;
};

// // Example
// console.log("JavaScript".startsWith("Java")); // true

// Ends With
String.prototype.endsWith = function (search, length) {
  length = length === undefined || length > this.length ? this.length : length;
  return this.substring(length - search.length, length) === search;
};

// // Example
// console.log("hello world".endsWith("world")); // true

// Repeat
String.prototype.repeat = function (count) {
  if (count < 0 || count === Infinity) {
    throw new RangeError("Invalid count value");
  }
  return new Array(count + 1).join(this);
};

// Example
// console.log("abc".repeat(3)); // "abcabcabc"

// Trim
String.prototype.trim = function () {
  return this.replace(/^\s+|\s+$/g, "");
};

// // Example
// console.log("   Hello World   ".trim()); // "Hello World"

// Pad Start
String.prototype.padStart = function (targetLength, padString) {
  targetLength = targetLength >> 0; // Convert to integer
  padString = String(padString || " ");
  if (this.length >= targetLength) {
    return String(this);
  }
  targetLength = targetLength - this.length;
  return (
    padString
      .repeat(Math.ceil(targetLength / padString.length))
      .substring(0, targetLength) + this
  );
};

// // Example
// console.log("5".padStart(3, "0")); // "005"

// Pad End
String.prototype.padEnd = function (targetLength, padString) {
  targetLength = targetLength >> 0;
  padString = String(padString || " ");
  if (this.length >= targetLength) {
    return String(this);
  }
  targetLength = targetLength - this.length;
  return (
    this +
    padString
      .repeat(Math.ceil(targetLength / padString.length))
      .substring(0, targetLength)
  );
};

// // Example
// console.log("5".padEnd(3, "0")); // "500"

// Replace All
String.prototype.replaceAll = function (search, replacement) {
  return this.split(search).join(replacement);
};

// // Example
// console.log("banana".replaceAll("a", "o")); // "bonono"

// LowerCase
String.prototype.toLowerCase = function () {
  return this.replace(/[A-Z]/g, (char) =>
    String.fromCharCode(char.charCodeAt(0) + 32)
  );
};

//  UpperCase
String.prototype.toUpperCase = function () {
  return this.replace(/[a-z]/g, (char) =>
    String.fromCharCode(char.charCodeAt(0) - 32)
  );
};

// Example
// console.log("Hello".toLowerCase()); // "hello"
// console.log("hello".toUpperCase()); // "HELLO"

// 65 97
