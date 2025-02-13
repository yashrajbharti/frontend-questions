const flat = function (arr, n) {
  const result = [];
  if (n === 0) return arr;
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === "object") result.push(...flat(arr[i], n - 1));
    else result.push(arr[i]);
  }
  return result;
};
