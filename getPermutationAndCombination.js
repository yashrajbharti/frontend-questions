// Function to generate all permutations of an array
function getPermutations(arr) {
  let result = [];

  function permute(arr, temp) {
    if (arr.length === 0) {
      result.push(temp);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let current = arr.slice();
        current.splice(i, 1);
        permute(current, temp.concat(arr[i]));
      }
    }
  }

  permute(arr, []);
  return result;
}

// Function to generate all combinations of an array
function getCombinations(arr, r) {
  let result = [];

  function combine(arr, temp, start) {
    if (temp.length === r) {
      result.push(temp);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      combine(arr, temp.concat(arr[i]), i + 1);
    }
  }

  combine(arr, [], 0);
  return result;
}

// Example Usage
const nums = [1, 2, 3];

console.log("All Permutations of [1, 2, 3]:", getPermutations(nums));

// [1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]

console.log(
  "All Combinations of [1, 2, 3] taken 2 at a time:",
  getCombinations(nums, 2)
);

// [1, 2], [1, 3], [2, 3]
