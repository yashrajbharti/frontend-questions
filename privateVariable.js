class Counter {
  #count = 0; // Private field

  increment() {
    this.#count++;
    console.log(`Count: ${this.#count}`);
  }

  decrement() {
    if (this.#count > 0) this.#count--;
    console.log(`Count: ${this.#count}`);
  }

  getCount() {
    return this.#count; // Can access within class
  }
}

const counter = new Counter();
counter.increment(); // Count: 1
counter.increment(); // Count: 2
console.log(counter.getCount()); // 2

// ❌ ERROR: Private field cannot be accessed outside the class
console.log(counter.#count); // SyntaxError: Private field '#count' must be declared in an enclosing class
