Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("myCall must be called on a function");
  }

  context = context || globalThis; // Default to global object if null/undefined

  const fnSymbol = Symbol(); // Create a unique property key to avoid overwriting
  context[fnSymbol] = this; // Assign the function to the context

  const result = context[fnSymbol](...args); // Call the function with provided arguments
  delete context[fnSymbol]; // Clean up by removing the temporary property

  return result; // Return the function's result
};

// function greet(greeting, punctuation) {
//     console.log(`${greeting}, ${this.name}${punctuation}`);
//   }

//   const person = { name: "Yash" };

//   greet.myCall(person, "Hello", "!"); // Output: "Hello, Yash!"
