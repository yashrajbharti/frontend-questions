console.log("Script start");

setTimeout(() => console.log("setTimeout"), 0);

Promise.resolve().then(() => console.log("Promise resolved"));

queueMicrotask(() => console.log("Microtask executed"));

console.log("Script end");

// Script start
// Script end
// Microtask executed
// Promise resolved
// setTimeout
