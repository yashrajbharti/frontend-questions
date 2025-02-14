class Calculator {
  constructor(value = 0) {
    this.value = value;
  }

  add(num) {
    this.value += num;
    return this; // Enables chaining
  }

  subtract(num) {
    this.value -= num;
    return this;
  }

  multiply(num) {
    this.value *= num;
    return this;
  }

  divide(num) {
    if (num === 0) throw new Error("Cannot divide by zero");
    this.value /= num;
    return this;
  }

  result() {
    return this.value; // Final result
  }
}

// // Usage Example
// const calc = new Calculator(10);
// console.log(calc.add(5).multiply(2).subtract(3).divide(3).result()); // Output: 8
