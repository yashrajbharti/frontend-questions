/**
 * Private Class Fields (#) - ES2022
 * 
 * Use # prefix to create truly private properties in classes.
 * Cannot be accessed outside the class, not even with bracket notation.
 */

// Basic private fields
class BankAccount {
  #balance = 0;          // Private field
  #accountNumber;        // Private field (uninitialized)
  
  constructor(initialBalance, accountNumber) {
    this.#balance = initialBalance;
    this.#accountNumber = accountNumber;
  }
  
  deposit(amount) {
    this.#balance += amount;
    return this.#balance;
  }
  
  withdraw(amount) {
    if (amount > this.#balance) {
      throw new Error('Insufficient funds');
    }
    this.#balance -= amount;
    return this.#balance;
  }
  
  getBalance() {
    return this.#balance;
  }
  
  #formatAccountNumber() {  // Private method
    return `****${this.#accountNumber.slice(-4)}`;
  }
  
  getAccountInfo() {
    return {
      number: this.#formatAccountNumber(),
      balance: this.#balance
    };
  }
}

const account = new BankAccount(1000, '1234567890');
console.log(account.getBalance());  // 1000
// console.log(account.#balance);   // SyntaxError!
// console.log(account['#balance']); // undefined (not accessible)

// Private methods
class Counter {
  #count = 0;
  
  increment() {
    this.#count++;
    this.#log('incremented');
  }
  
  #log(action) {  // Private method
    console.log(`Counter ${action}: ${this.#count}`);
  }
  
  getCount() {
    return this.#count;
  }
}

// Private static fields and methods
class IDGenerator {
  static #counter = 0;
  static #prefix = 'ID';
  
  static generate() {
    return `${this.#prefix}-${this.#getNextId()}`;
  }
  
  static #getNextId() {  // Private static method
    return ++this.#counter;
  }
}

console.log(IDGenerator.generate()); // "ID-1"
console.log(IDGenerator.generate()); // "ID-2"
// console.log(IDGenerator.#counter); // SyntaxError!

// Private getters and setters
class Temperature {
  #celsius = 0;
  
  get #fahrenheit() {
    return (this.#celsius * 9/5) + 32;
  }
  
  set #fahrenheit(f) {
    this.#celsius = (f - 32) * 5/9;
  }
  
  setCelsius(c) {
    this.#celsius = c;
  }
  
  getCelsius() {
    return this.#celsius;
  }
  
  setFahrenheit(f) {
    this.#fahrenheit = f;
  }
  
  getFahrenheit() {
    return this.#fahrenheit;
  }
}

// Checking for private fields
class User {
  #id;
  name;
  
  constructor(id, name) {
    this.#id = id;
    this.name = name;
  }
  
  hasPrivateId(obj) {
    try {
      obj.#id;  // Will throw if obj doesn't have #id
      return true;
    } catch {
      return false;
    }
  }
  
  // Better way with 'in' operator
  static hasId(obj) {
    return #id in obj;
  }
}

const user1 = new User(1, 'Alice');
const user2 = { name: 'Bob' };

console.log(User.hasId(user1)); // true
console.log(User.hasId(user2)); // false

// Practical examples

// 1. Singleton with private constructor
class Database {
  static #instance = null;
  #connection = null;
  
  constructor() {
    if (Database.#instance) {
      return Database.#instance;
    }
    Database.#instance = this;
    this.#connection = 'Connected';
  }
  
  query(sql) {
    return `Executing: ${sql}`;
  }
}

// 2. Encapsulated state machine
class StateMachine {
  #state = 'idle';
  #transitions = {
    idle: ['running'],
    running: ['paused', 'stopped'],
    paused: ['running', 'stopped'],
    stopped: []
  };
  
  transition(newState) {
    if (this.#canTransition(newState)) {
      this.#state = newState;
      return true;
    }
    return false;
  }
  
  #canTransition(newState) {
    return this.#transitions[this.#state].includes(newState);
  }
  
  getState() {
    return this.#state;
  }
}

// 3. Protected data with validation
class Person {
  #age;
  name;
  
  constructor(name, age) {
    this.name = name;
    this.age = age;  // Uses setter
  }
  
  get age() {
    return this.#age;
  }
  
  set age(value) {
    if (value < 0 || value > 150) {
      throw new Error('Invalid age');
    }
    this.#age = value;
  }
}

// Comparison with other privacy patterns

// Old way 1: WeakMap
const _balance = new WeakMap();
class OldBankAccount {
  constructor(balance) {
    _balance.set(this, balance);
  }
  getBalance() {
    return _balance.get(this);
  }
}

// Old way 2: Symbols
const _id = Symbol('id');
class OldUser {
  constructor(id) {
    this[_id] = id;
  }
}
// Still accessible via Object.getOwnPropertySymbols()

// New way: # fields (truly private) ✅
class NewUser {
  #id;
  constructor(id) {
    this.#id = id;
  }
}
// Completely inaccessible from outside

export { BankAccount, Counter, IDGenerator, StateMachine, Person };
