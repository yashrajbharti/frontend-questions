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
