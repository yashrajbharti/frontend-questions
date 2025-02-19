// Memory Allocation in JavaScript

// JavaScript stores memory in two areas:

// Stack (Primitive values) – Stores fixed-size data (numbers, strings, booleans).
// Heap (Objects, Functions) – Stores dynamically allocated memory (arrays, objects, closures).

// Stack memory (Primitive values)
let age = 30;
let name = "John";

// Heap memory (Objects & Functions)
let person = {
  name: "Alice",
  age: 25,
};

function greet() {
  return "Hello!";
}

let user = { name: "Alex" };
user = null; // Now, the object is "unreachable" → GC will clean it up.

let button = document.getElementById("clickMe");

function handleClick() {
  console.log("Clicked!");
}

button.addEventListener("click", handleClick);

// Cleanup to prevent memory leak
button.removeEventListener("click", handleClick);

let timer = setInterval(() => {
  console.log("Running...");
}, 1000);

// Cleanup
clearInterval(timer);

let div = document.getElementById("myDiv");
document.body.removeChild(div);
div = null; // Now eligible for garbage collection

let cache = new WeakMap();
let obj = { data: "cached data" };
cache.set(obj, "Stored!");

// Remove reference
obj = null; // Now, WeakMap will remove it from memory.

// Closures retain variables in scope even after execution.
// ✅ Fix: Nullify references if they’re not needed.

function outer() {
  let bigData = new Array(1000000); // Large memory allocation

  return function inner() {
    console.log(bigData.length);
  };
}

let closureFunc = outer();
closureFunc = null; // Now `bigData` is garbage-collected

// ✅ Chrome DevTools → Memory Tab

// Heap Snapshots – Analyze memory usage over time.
// Garbage Collection Tracking – See what objects remain in memory.
// ✅ Performance Profiling in DevTools
console.profile("Memory Test");
for (let i = 0; i < 100000; i++) {
  let obj = { name: "Memory" };
}
console.profileEnd();

// Garbage collection - mark and sweep
// Step	Action
// Mark Phase 🏷	Marks all reachable objects from the root
// Sweep Phase 🧹	Deletes unmarked (unreachable) objects
// Common Issues	Global variables, event listeners, intervals, closures
// Fixes	Use WeakMap, clear intervals, remove event listeners
