function gcd(a, b) {
  // Repeatedly apply the Euclidean algorithm
  while (b !== 0) {
    const temp = b;
    b = a % b; // Update b to the remainder
    a = temp; // Update a to the previous b
  }
  return a; // When b is 0, a is the GCD
}

// Example usage:
const result = gcd(56, 98);
console.log(result); // Output: 14
