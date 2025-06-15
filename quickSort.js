function quickSort(arr) {
  if (arr.length <= 1) return arr; // Base case

  const pivot = arr[arr.length - 1]; // Choose pivot (last element)
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }

  // Recursively sort left and right, then combine
  return [...quickSort(left), pivot, ...quickSort(right)];
}
