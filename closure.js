function createCounter() {
  let count = 0; // Private variable

  return function () {
    count++; // Inner function remembers `count`
    console.log(count);
  };
}

// const counter = createCounter();
// counter(); // 1
// counter(); // 2
// counter(); // 3
