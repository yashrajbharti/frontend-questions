function tokenize(str) {
  if (typeof str !== "string") {
    throw new TypeError("Input must be a string");
  }

  const tokens = [];
  const regex = /\w+|[^\s\w]/g; // Matches words, numbers, and symbols

  let match;
  while ((match = regex.exec(str)) !== null) {
    // regex has an internal pointer index that moves
    tokens.push(match[0]);
  }

  return tokens;
}

/**
 *
 * // Example Usage:
 * console.log(tokenize("Hello, world! This is a test 123."));
 * // Output: ["Hello", ",", "world", "!", "This", "is", "a", "test", "123", "."]
 *
 */

class StringTokenizer {
  constructor(str, delimiters = " ") {
    this.tokens = str.split(new RegExp(`[${delimiters}]+`)).filter(Boolean);
    this.index = 0;
  }

  hasMoreTokens() {
    return this.index < this.tokens.length;
  }

  nextToken() {
    if (this.hasMoreTokens()) {
      return this.tokens[this.index++];
    }
    throw new Error("No more tokens available");
  }

  countTokens() {
    return this.tokens.length - this.index;
  }
}

/**
 *
 * // Example Usage:
 * const tokenizer = new StringTokenizer("Hello, world! This is a test.", " ,!.");
 *
 * while (tokenizer.hasMoreTokens()) {
 *   console.log(tokenizer.nextToken());
 * }
 *
 */
