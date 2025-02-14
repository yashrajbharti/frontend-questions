function Person(name, age) {
  this.name = name;
  this.age = age;
}

function Employee(name, age, job) {
  Person.call(this, name, age); // Call Person constructor
  this.job = job;
}

// Inheriting from Person
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

// Adding new method
Employee.prototype.work = function () {
  return `${this.name} is working as a ${this.job}`;
};

// const bob = new Employee("Bob", 30, "Engineer");
// console.log(bob.work()); // "Bob is working as a Engineer"
// console.log(bob instanceof Employee); // true
// console.log(bob instanceof Person); // true

// SAME THING USING ES6 CLASSES
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayHello() {
    return `Hello, my name is ${this.name}`;
  }
}

class Employee extends Person {
  constructor(name, age, job) {
    super(name, age); // Call parent constructor
    this.job = job;
  }
  work() {
    return `${this.name} is working as a ${this.job}`;
  }
}

// const charlie = new Employee("Charlie", 28, "Designer");
// console.log(charlie.sayHello()); // "Hello, my name is Charlie"
// console.log(charlie.work()); // "Charlie is working as a Designer"
