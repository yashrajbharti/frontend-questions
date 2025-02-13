const reduce = function (nums, fn, init) {
  let acc = init;
  for (let i = 0; i < nums.length; i++) {
    acc = fn(acc, nums[i], i, nums);
  }
  return acc;
};

// const nums = [1, 2, 3, 4];

// // Sum
// const sum = reduce(nums, (acc, num) => acc + num, 0);
// console.log(sum); // Output: 10

// // Multiply
// const product = reduce(nums, (acc, num) => acc * num, 1);
// console.log(product); // Output: 24

// // Create an object mapping index to value
// const obj = reduce(
//   nums,
//   (acc, num, index) => {
//     acc[index] = num;
//     return acc;
//   },
//   {}
// );
// console.log(obj); // Output: { 0: 1, 1: 2, 2: 3, 3: 4 }
