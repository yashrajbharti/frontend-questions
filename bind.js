Function.prototype.myBind = function (context, ...boundArgs) {
  if (typeof this !== "function") {
    throw new TypeError("myBind must be called on a function");
  }

  context = context || globalThis;

  return (...args) => {
    return this.myApply(context, [...boundArgs, ...args]); // Using `myApply`
  };
};

// Example Usage
const boundGreet = greet.myBind(person, "Hey");
console.log(boundGreet()); // "Hey, Alice"
console.log(boundGreet("Good morning")); // "Hey, Alice" (arguments are preset)
