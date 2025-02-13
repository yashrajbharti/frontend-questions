function customPartial(fn, ...presetArgs) {
  return function (...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

// function greet(greeting, name) {
//   return `${greeting}, ${name}!`;
// }

// const sayHello = customPartial(greet, "Hello");
// console.log(sayHello("Alice")); // Output: "Hello, Alice!"

// const sayHiToJohn = customPartial(greet, "Hi", "John");
// console.log(sayHiToJohn()); // Output: "Hi, John!"
