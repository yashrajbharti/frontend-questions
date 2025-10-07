/**
 * Array.prototype.with() Method (ES2023)
 * 
 * Returns a new array with the element at the given index replaced.
 * Immutable alternative to array[index] = value.
 */

// Basic usage
const arr = ['a', 'b', 'c', 'd'];

// Old way (mutates)
const arr1 = [...arr];
arr1[2] = 'X';
console.log(arr1); // ['a', 'b', 'X', 'd']

// New way (immutable)
const arr2 = arr.with(2, 'X');
console.log(arr2);  // ['a', 'b', 'X', 'd']
console.log(arr);   // ['a', 'b', 'c', 'd'] (unchanged)

// Negative indices (count from end)
const numbers = [1, 2, 3, 4, 5];
const updated = numbers.with(-1, 99);
console.log(updated); // [1, 2, 3, 4, 99]

const updated2 = numbers.with(-2, 88);
console.log(updated2); // [1, 2, 3, 88, 5]

// Chaining with other immutable methods
const original = [10, 20, 30, 40, 50];
const result = original
  .with(0, 99)           // [99, 20, 30, 40, 50]
  .with(-1, 77)          // [99, 20, 30, 40, 77]
  .toReversed();         // [77, 40, 30, 20, 99]

console.log(result);   // [77, 40, 30, 20, 99]
console.log(original); // [10, 20, 30, 40, 50] (unchanged)

// Out of bounds throws RangeError
try {
  const invalid = arr.with(10, 'X');
} catch (e) {
  console.log(e.message); // Index out of bounds
}

// Practical examples

// 1. React state updates (immutable)
function updateTodo(todos, index, newTodo) {
  return todos.with(index, newTodo);
}

const todos = [
  { id: 1, text: 'Learn JS', done: false },
  { id: 2, text: 'Build app', done: false }
];

const updatedTodos = updateTodo(todos, 1, { 
  id: 2, 
  text: 'Build app', 
  done: true 
});

// 2. Toggle array element
function toggleArrayElement(arr, index) {
  return arr.with(index, !arr[index]);
}

const flags = [true, false, true, false];
const toggled = toggleArrayElement(flags, 1);
console.log(toggled); // [true, true, true, false]

// 3. Increment specific element
function incrementAt(numbers, index) {
  return numbers.with(index, numbers[index] + 1);
}

const scores = [10, 20, 30, 40];
const newScores = incrementAt(scores, 2);
console.log(newScores); // [10, 20, 31, 40]

// 4. Replace element based on condition
function replaceIfZero(arr, index) {
  return arr[index] === 0 ? arr.with(index, null) : arr;
}

// 5. Update nested structures
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Update element at [1][1]
const updatedMatrix = matrix.with(1, matrix[1].with(1, 99));
console.log(updatedMatrix);
// [[1, 2, 3], [4, 99, 6], [7, 8, 9]]

// 6. Functional programming style
const operations = [
  (arr) => arr.with(0, arr[0] * 2),
  (arr) => arr.with(1, arr[1] + 10),
  (arr) => arr.with(2, arr[2] - 5)
];

const data = [5, 10, 15];
const processed = operations.reduce((acc, op) => op(acc), data);
console.log(processed); // [10, 20, 10]

// Comparison with spread operator
const items = ['x', 'y', 'z'];

// Using spread (verbose for single element)
const spread1 = [...items.slice(0, 1), 'NEW', ...items.slice(2)];

// Using with() (cleaner)
const with1 = items.with(1, 'NEW');

console.log(spread1); // ['x', 'NEW', 'z']
console.log(with1);   // ['x', 'NEW', 'z']

// Works with TypedArrays
const uint8 = new Uint8Array([10, 20, 30, 40]);
const updatedUint8 = uint8.with(2, 99);
console.log(updatedUint8); // Uint8Array [10, 20, 99, 40]

// Multiple updates (can chain)
const values = [1, 2, 3, 4, 5];
const multiUpdate = values
  .with(0, 100)
  .with(2, 300)
  .with(4, 500);

console.log(multiUpdate); // [100, 2, 300, 4, 500]

// Helper function for multiple updates
function withMultiple(arr, updates) {
  return updates.reduce((acc, [index, value]) => {
    return acc.with(index, value);
  }, arr);
}

const changes = [[0, 'A'], [2, 'C'], [4, 'E']];
const updated3 = withMultiple(['a', 'b', 'c', 'd', 'e'], changes);
console.log(updated3); // ['A', 'b', 'C', 'd', 'E']

export { updateTodo, toggleArrayElement, incrementAt, withMultiple };
