// Creational Pattern
class Singleton {
  static instance;

  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this;
    }
    return Singleton.instance;
  }

  logMessage() {
    console.log("Using Singleton!");
  }
}

const singletonA = new Singleton();
const singletonB = new Singleton();

console.log(singletonA === singletonB); // true
singletonA.logMessage(); // "Using Singleton!"

// Or we can throw error if someone tries to create another instance

let instance;
let counter = 0;

class Counter {
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const singletonCounter = Object.freeze(new Counter());
export default singletonCounter;
