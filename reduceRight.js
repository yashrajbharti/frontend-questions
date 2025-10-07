/**
 * Array.prototype.reduceRight()
 * 
 * Like reduce(), but processes array elements from right to left.
 * Useful for operations where order matters (composition, folding, etc.)
 */

// Basic usage
const arr = [1, 2, 3, 4];

// reduce (left to right)
const sumLeft = arr.reduce((acc, val) => acc + val, 0);
console.log(sumLeft); // 10

// reduceRight (right to left)
const sumRight = arr.reduceRight((acc, val) => acc + val, 0);
console.log(sumRight); // 10 (same for addition)

// Where order matters
const letters = ['h', 'e', 'l', 'l', 'o'];

const forward = letters.reduce((acc, val) => acc + val, '');
console.log(forward); // "hello"

const backward = letters.reduceRight((acc, val) => acc + val, '');
console.log(backward); // "olleh"

// Practical use cases

// 1. Function composition (right to left)
const compose = (...fns) => 
  fns.reduceRight((f, g) => (...args) => g(f(...args)));

const add5 = x => x + 5;
const multiply3 = x => x * 3;
const subtract2 = x => x - 2;

const composed = compose(subtract2, multiply3, add5);
console.log(composed(10)); // ((10 + 5) * 3) - 2 = 43

// 2. Building nested structures from right
const paths = ['a', 'b', 'c', 'd'];

const nested = paths.reduceRight((acc, key) => ({ [key]: acc }), 'value');
console.log(nested);
// { a: { b: { c: { d: 'value' } } } }

// 3. Flattening nested arrays (reverse order)
const nestedArr = [[1, 2], [3, 4], [5, 6]];

const flattened = nestedArr.reduceRight((acc, val) => acc.concat(val), []);
console.log(flattened); // [5, 6, 3, 4, 1, 2]

// 4. Building HTML from right to left
const tags = ['div', 'span', 'p'];

const html = tags.reduceRight((content, tag) => {
  return `<${tag}>${content}</${tag}>`;
}, 'Hello World');

console.log(html);
// "<div><span><p>Hello World</p></span></div>"

// 5. Reverse pipe (left to right execution, but defined right to left)
const pipe = (...fns) =>
  fns.reduceRight((f, g) => (...args) => f(g(...args)));

// 6. Processing dependencies in reverse
const steps = [
  { name: 'Deploy', time: 5 },
  { name: 'Test', time: 10 },
  { name: 'Build', time: 15 }
];

const totalTime = steps.reduceRight((acc, step) => {
  console.log(`Processing: ${step.name}`);
  return acc + step.time;
}, 0);
// Processing: Build -> Test -> Deploy

// 7. Creating a reverse lookup
const keyValues = [
  ['a', 1],
  ['b', 2],
  ['c', 3]
];

const lookup = keyValues.reduceRight((acc, [key, val]) => {
  acc[val] = key;
  return acc;
}, {});

console.log(lookup); // { 1: 'a', 2: 'b', 3: 'c' }

export { compose, pipe };
