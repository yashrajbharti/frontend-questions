/**
 * Array.prototype.toSorted()
 * 
 * Returns a NEW sorted array without modifying the original.
 * Part of the "Change Array by Copy" proposal (ES2023).
 * Similar to sort() but immutable.
 */

// Basic usage
const numbers = [3, 1, 4, 1, 5, 9];

// Old way (mutates original)
const sorted1 = [...numbers].sort((a, b) => a - b);

// New way (immutable by default)
const sorted2 = numbers.toSorted((a, b) => a - b);

console.log(numbers);  // [3, 1, 4, 1, 5, 9] (unchanged)
console.log(sorted2);  // [1, 1, 3, 4, 5, 9]

// String sorting
const fruits = ['banana', 'apple', 'cherry'];
const sortedFruits = fruits.toSorted();
console.log(sortedFruits); // ['apple', 'banana', 'cherry']
console.log(fruits);       // ['banana', 'apple', 'cherry'] (unchanged)

// Sorting objects
const users = [
  { name: 'John', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 35 }
];

const sortedByAge = users.toSorted((a, b) => a.age - b.age);
console.log(sortedByAge);
// [{ name: 'Alice', age: 25 }, { name: 'John', age: 30 }, { name: 'Bob', age: 35 }]

const sortedByName = users.toSorted((a, b) => a.name.localeCompare(b.name));
console.log(sortedByName);
// [{ name: 'Alice', ... }, { name: 'Bob', ... }, { name: 'John', ... }]

// Descending order
const nums = [5, 2, 8, 1, 9];
const descending = nums.toSorted((a, b) => b - a);
console.log(descending); // [9, 8, 5, 2, 1]

// Other immutable array methods (ES2023)

// toReversed() - reverse without mutation
const original = [1, 2, 3];
const reversed = original.toReversed();
console.log(reversed); // [3, 2, 1]
console.log(original); // [1, 2, 3] (unchanged)

// toSpliced() - splice without mutation
const arr = ['a', 'b', 'c', 'd'];
const spliced = arr.toSpliced(1, 2, 'x', 'y');
console.log(spliced); // ['a', 'x', 'y', 'd']
console.log(arr);     // ['a', 'b', 'c', 'd'] (unchanged)

// with() - replace element at index without mutation
const items = ['a', 'b', 'c'];
const updated = items.with(1, 'z');
console.log(updated); // ['a', 'z', 'c']
console.log(items);   // ['a', 'b', 'c'] (unchanged)

// Practical use cases

// 1. React state updates (immutable)
function sortUsersByAge(users) {
  return users.toSorted((a, b) => a.age - b.age);
}

// 2. Multiple sort orders without affecting original
const products = [
  { name: 'Laptop', price: 1000 },
  { name: 'Mouse', price: 25 },
  { name: 'Keyboard', price: 75 }
];

const byPrice = products.toSorted((a, b) => a.price - b.price);
const byName = products.toSorted((a, b) => a.name.localeCompare(b.name));
// Both sorted versions available, original unchanged

// 3. Chaining immutable operations
const data = [3, 1, 4, 1, 5];
const result = data
  .toSorted((a, b) => a - b)
  .toReversed()
  .with(0, 99);
console.log(result); // [99, 5, 4, 3, 1]
console.log(data);   // [3, 1, 4, 1, 5] (unchanged)

export { sortUsersByAge };
