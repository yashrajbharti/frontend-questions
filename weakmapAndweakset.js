let weakmap = new WeakMap();

let obj = { name: "Alice" };

// The key (obj) is weakly referenced
weakmap.set(obj, "some value");

console.log(weakmap.get(obj)); // "some value"

// If `obj` is no longer referenced elsewhere:
obj = null; // The object can now be garbage collected

// The object in the WeakMap is also eligible for garbage collection now

let weakset = new WeakSet();

let obj1 = { name: "Alice" };
let obj2 = { name: "Bob" };

// Objects are weakly referenced
weakset.add(obj1);
weakset.add(obj2);

console.log(weakset.has(obj1)); // true
console.log(weakset.has(obj2)); // true

// If obj1 is no longer referenced elsewhere
obj1 = null; // It is eligible for garbage collection

// The WeakSet will not prevent obj1 from being garbage collected

// Both allow garbage collection
// Garbage collection is a process by which a programming language automatically manages memory by reclaiming memory that is no longer in use.
