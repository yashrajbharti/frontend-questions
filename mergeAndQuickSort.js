const mergeSort = (arr) => {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
};

const merge = (left, right) => {
  let sortedArray = [];
  while (left.length && right.length) {
    sortedArray.push(left[0] < right[0] ? left.shift() : right.shift());
  }
  return [...sortedArray, ...left, ...right];
};

// Example
// console.log(mergeSort([5, 3, 8, 4, 2])); // [2, 3, 4, 5, 8]

const quickSort = (arr) => {
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left = arr.filter((el) => el < pivot);
  const right = arr.filter((el) => el > pivot);
  const middle = arr.filter((el) => el === pivot);

  return [...quickSort(left), ...middle, ...quickSort(right)];
};

// Example
// console.log(quickSort([5, 3, 8, 4, 2])); // [2, 3, 4, 5, 8]
