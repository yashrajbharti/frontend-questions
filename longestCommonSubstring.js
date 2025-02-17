function longestCommonSubstring(str1, str2) {
  const m = str1.length;
  const n = str2.length;

  // Create a 2D array for dynamic programming
  let dp = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  let maxLength = 0;
  let endIndex = 0; // To store the ending index of the longest common substring in str1

  // Build the DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        if (dp[i][j] > maxLength) {
          maxLength = dp[i][j];
          endIndex = i - 1; // The end index of the substring in str1
        }
      } else {
        dp[i][j] = 0; // Reset when characters do not match
      }
    }
  }

  // Extract the longest common substring using endIndex and maxLength
  const longestSubstring = str1.substring(
    endIndex - maxLength + 1,
    endIndex + 1
  );

  return longestSubstring;
}

// Example Usage:
const str1 = "abcdefg";
const str2 = "zcdemfgh";
const result = longestCommonSubstring(str1, str2);
console.log(result); // Output: "cde"
