/**
 * JavaScript Symbols
 * 
 * Symbols are unique and immutable primitive values.
 * Used for creating private object properties and built-in behaviors.
 */

// Creating symbols
const sym1 = Symbol();
const sym2 = Symbol('description');
const sym3 = Symbol('description');

console.log(sym2 === sym3); // false (each symbol is unique)
console.log(typeof sym1);   // "symbol"

// Symbols as object keys (private properties)
const id = Symbol('id');
const user = {
  name: 'John',
  [id]: 123
};

console.log(user[id]);  // 123
console.log(user.id);   // undefined

// Symbols are hidden from most object operations
console.log(Object.keys(user));           // ['name']
console.log(JSON.stringify(user));        // {"name":"John"}
console.log(Object.getOwnPropertyNames(user)); // ['name']

// But can be accessed with specific methods
console.log(Object.getOwnPropertySymbols(user)); // [Symbol(id)]

// Well-known symbols (built-in)

// 1. Symbol.iterator - make objects iterable
const range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    return {
      current: this.from,
      last: this.to,
      next() {
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        }
        return { done: true };
      }
    };
  }
};

for (let num of range) {
  console.log(num); // 1, 2, 3, 4, 5
}

// 2. Symbol.toStringTag - customize Object.prototype.toString
class ValidatorClass {
  get [Symbol.toStringTag]() {
    return 'Validator';
  }
}

const validator = new ValidatorClass();
console.log(validator.toString()); // "[object Validator]"

// 3. Symbol.toPrimitive - customize type conversion
const obj = {
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') return 42;
    if (hint === 'string') return 'hello';
    return true;
  }
};

console.log(+obj);      // 42 (number)
console.log(`${obj}`);  // "hello" (string)
console.log(obj + '');  // "hello" (default)

// 4. Symbol.hasInstance - customize instanceof
class MyArray {
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance);
  }
}

console.log([] instanceof MyArray); // true

// Global symbol registry
const globalSym1 = Symbol.for('app.id');
const globalSym2 = Symbol.for('app.id');

console.log(globalSym1 === globalSym2); // true (same symbol)

// Get description of global symbol
console.log(Symbol.keyFor(globalSym1)); // "app.id"

// Practical use cases

// 1. Private properties in objects
const _balance = Symbol('balance');
const _withdraw = Symbol('withdraw');

class BankAccount {
  constructor(initialBalance) {
    this[_balance] = initialBalance;
  }
  
  [_withdraw](amount) {
    this[_balance] -= amount;
  }
  
  getBalance() {
    return this[_balance];
  }
}

// 2. Metadata storage
const metadata = Symbol('metadata');
const myObject = {
  value: 'data',
  [metadata]: {
    created: new Date(),
    version: '1.0'
  }
};

// 3. Avoiding property name collisions
const library1 = {
  [Symbol.for('lib.method')]() {
    return 'library1';
  }
};

const library2 = {
  [Symbol.for('lib.method')]() {
    return 'library2';
  }
};

// Each library's method is unique

export { BankAccount, range };
