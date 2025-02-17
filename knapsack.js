function knapsack(weights, values, W) {
  const n = weights.length;

  // Initialize DP table with all zeros
  let dp = Array(n + 1)
    .fill()
    .map(() => Array(W + 1).fill(0));

  // Build the DP table
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= W; w++) {
      if (weights[i - 1] <= w) {
        // If the current item can be included
        dp[i][w] = Math.max(
          dp[i - 1][w],
          dp[i - 1][w - weights[i - 1]] + values[i - 1]
        );
      } else {
        // Otherwise, we can't include the item
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  // The bottom-right cell will have the maximum value
  return dp[n][W];
}

// Example usage
const weights = [2, 3, 4, 5]; // Weights of items
const values = [3, 4, 5, 6]; // Values of items
const capacity = 5; // Maximum weight capacity of the knapsack

const maxValue = knapsack(weights, values, capacity);
console.log(`Maximum value in Knapsack = ${maxValue}`); // Output: Maximum value in Knapsack = 7
