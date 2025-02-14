Array.prototype.myMap = function (callback) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i)) result.push(callback(this[i], i, this));
  }
  return result;
};

// // Example Usage
// const nums = [1, 2, 3];
// console.log(nums.myMap((x) => x * 2)); // [2, 4, 6]

Array.prototype.myFilter = function (callback) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i) && callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

// // Example Usage
// console.log(nums.myFilter((x) => x > 1)); // [2, 3]

Array.prototype.myReduce = function (callback, initialValue) {
  let acc = initialValue !== undefined ? initialValue : this[0];
  let startIndex = initialValue !== undefined ? 0 : 1;

  for (let i = startIndex; i < this.length; i++) {
    if (this.hasOwnProperty(i)) {
      acc = callback(acc, this[i], i, this);
    }
  }
  return acc;
};

// // Example Usage
// console.log(nums.myReduce((acc, val) => acc + val, 0)); // 6

Array.prototype.myForEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i)) callback(this[i], i, this);
  }
};

// // Example Usage
// nums.myForEach((x) => console.log(x * 2)); // Logs: 2, 4, 6

Array.prototype.myFind = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i) && callback(this[i], i, this)) {
      return this[i];
    }
  }
  return undefined;
};

// // Example Usage
// console.log(nums.myFind((x) => x > 1)); // 2

Array.prototype.mySome = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i) && callback(this[i], i, this)) {
      return true;
    }
  }
  return false;
};

// // Example Usage
// console.log(nums.mySome((x) => x > 2)); // true

Array.prototype.myEvery = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i) && !callback(this[i], i, this)) {
      return false;
    }
  }
  return true;
};

// // Example Usage
// console.log(nums.myEvery((x) => x > 0)); // true
// console.log(nums.myEvery((x) => x > 2)); // false

Array.prototype.myIncludes = function (searchElement, fromIndex = 0) {
  for (let i = fromIndex; i < this.length; i++) {
    if (this[i] === searchElement) {
      return true;
    }
  }
  return false;
};

// // Example Usage
// console.log(nums.myIncludes(2)); // true
// console.log(nums.myIncludes(5)); // false

Array.prototype.myIndexOf = function (searchElement, fromIndex = 0) {
  for (let i = fromIndex; i < this.length; i++) {
    if (this[i] === searchElement) return i;
  }
  return -1;
};

// // Example Usage
// console.log(nums.myIndexOf(2)); // 1
// console.log(nums.myIndexOf(5)); // -1

Array.prototype.myFlat = function (depth = 1) {
  let result = [];

  function flatten(arr, d) {
    for (let item of arr) {
      if (Array.isArray(item) && d > 0) {
        flatten(item, d - 1);
      } else {
        result.push(item);
      }
    }
  }

  flatten(this, depth);
  return result;
};

// // Example Usage
// console.log([1, [2, [3, [4]]]].myFlat(2)); // [1, 2, 3, [4]]
