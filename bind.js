Function.prototype.myBind = function (context, ...boundArgs) {
  if (typeof this !== "function") {
    throw new TypeError("myBind must be called on a function");
  }

  context = context || globalThis; // Default to global object if null/undefined

  const originalFn = this; // Save reference to the original function

  function boundFunction(...args) {
    return originalFn.apply(this instanceof boundFunction ? this : context, [
      ...boundArgs,
      ...args,
    ]);
  }

  boundFunction.prototype = Object.create(originalFn.prototype); // Maintain prototype chain

  return boundFunction;
};

// function Person(name, age) {
//     this.name = name;
//     this.age = age;
//   }

//   const createPerson = Person.myBind(null, "Yash");
//   const p1 = new createPerson(25);
//   console.log(p1.name, p1.age); // Output: Yash 25

//   function greet(greeting, punctuation) {
//     return `${greeting}, I'm ${this.name}${punctuation}`;
//   }

//   const user = { name: "Alice" };

//   const boundGreet = greet.myBind(user, "Hello");
//   console.log(boundGreet("!")); // Output: "Hello, I'm Alice!"
