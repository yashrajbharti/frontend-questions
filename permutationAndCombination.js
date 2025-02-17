// Helper function to calculate factorial
function factorial(n) {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Permutations - P(n, r) = n! / (n - r)!
function permutations(n, r) {
  return factorial(n) / factorial(n - r);
}

// Combinations - C(n, r) = n! / (r! * (n - r)!)
function combinations(n, r) {
  return factorial(n) / (factorial(r) * factorial(n - r));
}

const nums = [1, 2, 3];

// Finding Permutations and Combinations for n = 3, r = 2
console.log("Permutations (P(3, 2)):", permutations(3, 2)); // 6
console.log("Combinations (C(3, 2)):", combinations(3, 2)); // 3
