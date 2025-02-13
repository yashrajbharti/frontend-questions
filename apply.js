Function.prototype.myApply = function (context, argsArray = []) {
  if (typeof this !== "function") {
    throw new TypeError("myApply must be called on a function");
  }

  context = context || globalThis; // Default to global object if null/undefined

  const fnSymbol = Symbol(); // Create a unique property key to avoid overwriting
  context[fnSymbol] = this; // Assign the function to the context

  const result = context[fnSymbol](...argsArray);
  // Invoke function with arguments
  delete context[fnSymbol]; // Clean up

  return result; // Return function's result
};

// function introduce(language1, language2) {
//   console.log(
//     `Hi, I'm ${this.name}, and I speak ${language1} and ${language2}.`
//   );
// }

// const person = { name: "Yash" };

// introduce.myApply(person, ["English", "Hindi"]);
// // Output: "Hi, I'm Yash, and I speak English and Hindi."
