/**
 * Nullish Coalescing (??) Operator
 * 
 * Returns the right-hand operand when the left-hand operand is null or undefined.
 * Unlike ||, it doesn't treat 0, false, or "" as falsy values to replace.
 */

// Basic usage
const value1 = null ?? "default";        // "default"
const value2 = undefined ?? "default";   // "default"
const value3 = "hello" ?? "default";     // "hello"

// Key difference from || operator
console.log(0 || 100);          // 100 (0 is falsy)
console.log(0 ?? 100);          // 0 (0 is not null/undefined)

console.log("" || "default");   // "default" ("" is falsy)
console.log("" ?? "default");   // "" ("" is not null/undefined)

console.log(false || true);     // true (false is falsy)
console.log(false ?? true);     // false (false is not null/undefined)

// Practical use cases

// 1. Configuration with zero values
const config = {
  port: 0,
  retries: 0,
  timeout: null
};

const port = config.port ?? 3000;       // 0 (correct!)
const retries = config.retries ?? 3;    // 0 (correct!)
const timeout = config.timeout ?? 5000; // 5000

// 2. Function parameters with zero defaults
function processItems(count, startIndex) {
  count = count ?? 10;           // Allows 0
  startIndex = startIndex ?? 0;  // Works correctly
  
  console.log(`Processing ${count} items from index ${startIndex}`);
}

processItems(0, 0);  // "Processing 0 items from index 0"

// 3. Form values
const formData = {
  quantity: 0,
  name: "",
  email: null
};

const quantity = formData.quantity ?? 1;  // 0 (user entered 0)
const name = formData.name ?? "Guest";    // "" (user entered empty string)
const email = formData.email ?? "none@example.com"; // "none@example.com"

// 4. API responses
function handleResponse(response) {
  const data = response.data ?? [];
  const count = response.count ?? 0;  // Allows 0 as valid count
  const success = response.success ?? false;
  
  return { data, count, success };
}

// 5. Chaining with optional chaining
const user = {
  profile: {
    age: 0,
    name: ""
  }
};

const age = user?.profile?.age ?? 18;       // 0
const name = user?.profile?.name ?? "Anonymous"; // ""
const city = user?.profile?.city ?? "Unknown";   // "Unknown"

// 6. Short-circuit evaluation
let count = 0;
const result = null ?? (count++, "value");
console.log(count); // 1 (right side evaluated)

const result2 = "exists" ?? (count++, "value");
console.log(count); // 1 (right side not evaluated)

// 7. Cannot mix with || or && without parentheses
// const invalid = true || false ?? "default"; // SyntaxError
const valid = (true || false) ?? "default";    // true

export { processItems, handleResponse };
