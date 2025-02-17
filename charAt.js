function customCharAt(str, index) {
  // Handle invalid index (negative or out of bounds)
  if (index < 0 || index >= str.length) {
    return ""; // Return empty string if index is out of bounds
  }

  return str[index]; // Return the character at the given index
}

// Example usage:
console.log(customCharAt("hello", 1)); // "e"
console.log(customCharAt("hello", 4)); // "o"
console.log(customCharAt("hello", 10)); // ""
console.log(customCharAt("hello", -1)); // ""
