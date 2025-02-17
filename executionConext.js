// Flow of execution

console.log("Start");

function first() {
  console.log("Inside first function");
  second();
  console.log("Exiting first function");
}

function second() {
  console.log("Inside second function");
}

first();
console.log("End");

// 1️⃣ Start	Global Execution Context
// 2️⃣ Call first()	first() pushed onto the stack
// 3️⃣ Inside first(), call second()	second() pushed onto the stack
// 4️⃣ Execute second(), return	second() popped off the stack
// 5️⃣ Finish first(), return	first() popped off the stack
// 6️⃣ Finish Global Execution	Global Execution Context removed
