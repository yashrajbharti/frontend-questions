/**
 * Optional Chaining (?.) Operator
 * 
 * Safely access nested object properties without throwing errors
 * if an intermediate property doesn't exist or is null/undefined.
 */

// Basic usage
const user = {
  name: "John",
  address: {
    city: "New York",
    street: "5th Avenue"
  }
};

// Without optional chaining
const city1 = user && user.address && user.address.city;

// With optional chaining
const city2 = user?.address?.city; // "New York"

// Accessing non-existent properties
const zipCode = user?.address?.zipCode; // undefined (no error)
const country = user?.location?.country; // undefined (no error)

// Optional chaining with arrays
const users = [
  { name: "John", age: 30 },
  null,
  { name: "Jane" }
];

console.log(users[0]?.name);  // "John"
console.log(users[1]?.name);  // undefined
console.log(users[2]?.age);   // undefined

// Optional chaining with function calls
const obj = {
  sayHello: () => "Hello!",
  nested: null
};

console.log(obj.sayHello?.());      // "Hello!"
console.log(obj.sayGoodbye?.());    // undefined (no error)
console.log(obj.nested?.method?.()); // undefined

// With array methods
const data = {
  users: [
    { name: "Alice", email: "alice@example.com" },
    { name: "Bob" }
  ]
};

const firstEmail = data?.users?.[0]?.email; // "alice@example.com"
const thirdEmail = data?.users?.[2]?.email; // undefined

// Practical examples

// API response handling
function getUserCity(response) {
  return response?.data?.user?.address?.city || "Unknown";
}

// Event handling
function handleClick(event) {
  const value = event?.target?.dataset?.value;
  console.log(value);
}

// DOM manipulation
const element = document.querySelector("#myElement");
const textContent = element?.firstChild?.textContent;

// With nullish coalescing
const port = process?.env?.PORT ?? 3000;
const username = user?.profile?.name ?? "Anonymous";

// Short-circuiting behavior
let count = 0;
const result = null?.property?.(count++); // count is still 0
console.log(count); // 0 (function never called)

export default getUserCity;
