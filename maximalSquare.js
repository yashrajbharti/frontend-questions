function largestSquare(matrix) {
  if (!matrix.length || !matrix[0].length) return 0;

  const m = matrix.length,
    n = matrix[0].length;
  let dp = Array(m)
    .fill(0)
    .map(() => Array(n).fill(0));
  let maxSize = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] == "1") {
        if (i === 0 || j === 0) {
          dp[i][j] = 1;
        } else {
          dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
        }
        maxSize = Math.max(maxSize, dp[i][j]);
      }
    }
  }
  return maxSize * maxSize;
}

// Example Usage
const matrix = [
  ["1", "0", "1", "0", "0"],
  ["1", "0", "1", "1", "1"],
  ["1", "1", "1", "1", "1"],
  ["1", "0", "0", "1", "0"],
];

console.log(largestSquare(matrix)); // Output: 4 (2x2 square)

// Answer:
// 1  0  1  0  0
// 1  0  1  1  1
// 1  1  1  2  2
// 1  0  0  1  0
