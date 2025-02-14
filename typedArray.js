class CustomTypedArray {
  constructor(length, type = "number") {
    if (length < 0 || !Number.isInteger(length)) {
      throw new Error("Invalid array length");
    }

    this.length = length;
    this.type = type;
    this.data = new Array(length).fill(this.getDefaultValue());
  }

  // Returns default value based on the type
  getDefaultValue() {
    const defaults = {
      number: 0,
      int: 0,
      float: 0.0,
      boolean: false,
    };
    return defaults[this.type] ?? null;
  }

  // Validate if a value matches the TypedArray type
  validateType(value) {
    if (this.type === "int" && !Number.isInteger(value)) {
      throw new TypeError("Only integers allowed in this TypedArray.");
    }
    if (this.type === "boolean" && typeof value !== "boolean") {
      throw new TypeError("Only boolean values allowed in this TypedArray.");
    }
    if (this.type === "float" && typeof value !== "number") {
      throw new TypeError("Only float numbers allowed in this TypedArray.");
    }
  }

  // Set value at a given index
  set(index, value) {
    if (index < 0 || index >= this.length) {
      throw new RangeError("Index out of bounds.");
    }
    this.validateType(value);
    this.data[index] = value;
  }

  // Get value at a given index
  get(index) {
    if (index < 0 || index >= this.length) {
      throw new RangeError("Index out of bounds.");
    }
    return this.data[index];
  }

  // Map function
  map(callback) {
    let newArray = new CustomTypedArray(this.length, this.type);
    for (let i = 0; i < this.length; i++) {
      newArray.set(i, callback(this.data[i], i, this));
    }
    return newArray;
  }

  // Reduce function
  reduce(callback, initialValue) {
    let acc = initialValue !== undefined ? initialValue : this.data[0];
    let startIndex = initialValue !== undefined ? 0 : 1;

    for (let i = startIndex; i < this.length; i++) {
      acc = callback(acc, this.data[i], i, this);
    }
    return acc;
  }

  // ForEach function
  forEach(callback) {
    for (let i = 0; i < this.length; i++) {
      callback(this.data[i], i, this);
    }
  }

  // Convert array to string
  toString() {
    return `[ ${this.data.join(", ")} ]`;
  }
}

// const arr = new CustomTypedArray(5, "int");

// // Set values
// arr.set(0, 10);
// arr.set(1, 20);
// arr.set(2, 30);

// console.log(arr.get(1)); // 20
// console.log(arr.toString()); // [ 10, 20, 30, 0, 0 ]

// // Using map
// const doubled = arr.map(x => x * 2);
// console.log(doubled.toString()); // [ 20, 40, 60, 0, 0 ]

// // Using reduce
// const sum = arr.reduce((acc, val) => acc + val, 0);
// console.log(sum); // 60

// // Using forEach
// arr.forEach((value, index) => console.log(`Index ${index}: ${value}`));
