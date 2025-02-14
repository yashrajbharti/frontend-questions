function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Adding a method to Person's prototype
Person.prototype.sayHello = function () {
  return `Hello, my name is ${this.name}`;
};

const alice = new Person("Alice", 25);
console.log(alice.sayHello()); // "Hello, my name is Alice"

// Checking prototype
console.log(alice.__proto__ === Person.prototype); // true; deprecated but supported (for now)
console.log(Person.prototype.constructor === Person); // true
