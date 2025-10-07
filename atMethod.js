/**
 * Array/String .at() Method (ES2022)
 * 
 * Access array/string elements by index, with support for negative indices.
 * Negative indices count from the end of the array/string.
 */

// Array.at()
const arr = ['a', 'b', 'c', 'd', 'e'];

// Positive indices (same as bracket notation)
console.log(arr.at(0));  // 'a'
console.log(arr.at(2));  // 'c'
console.log(arr[2]);     // 'c' (same)

// Negative indices (count from end)
console.log(arr.at(-1)); // 'e' (last element)
console.log(arr.at(-2)); // 'd' (second to last)
console.log(arr.at(-5)); // 'a' (first element)

// Old way to get last element
console.log(arr[arr.length - 1]);  // 'e'

// New way
console.log(arr.at(-1));           // 'e' (cleaner!)

// Out of bounds
console.log(arr.at(10));  // undefined
console.log(arr.at(-10)); // undefined

// String.at()
const str = 'Hello World';

console.log(str.at(0));   // 'H'
console.log(str.at(6));   // 'W'
console.log(str.at(-1));  // 'd' (last character)
console.log(str.at(-5));  // 'W'

// Practical use cases

// 1. Getting last element without knowing length
function getLastItem(arr) {
  return arr.at(-1);
}

console.log(getLastItem([1, 2, 3]));     // 3
console.log(getLastItem(['x', 'y', 'z'])); // 'z'

// 2. Palindrome checker
function isPalindrome(str) {
  const len = str.length;
  for (let i = 0; i < len / 2; i++) {
    if (str.at(i) !== str.at(-1 - i)) {
      return false;
    }
  }
  return true;
}

console.log(isPalindrome('racecar')); // true
console.log(isPalindrome('hello'));   // false

// 3. Get nth item from end
function getNthFromEnd(arr, n) {
  return arr.at(-n);
}

console.log(getNthFromEnd([1, 2, 3, 4, 5], 2)); // 4

// 4. Rotating arrays
function rotateArray(arr, positions) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr.at(i - positions));
  }
  return result;
}

// 5. Safe array access
function safeAccess(arr, index) {
  // at() returns undefined for out-of-bounds instead of throwing
  return arr.at(index) ?? 'default';
}

// 6. Working with method chains
const data = [1, 2, 3, 4, 5];
const lastEven = data
  .filter(n => n % 2 === 0)
  .at(-1);  // 4 (last even number)

// 7. Unicode-aware string access
const emoji = '👨‍👩‍👧‍👦';
console.log(emoji.at(0));  // '👨' (first emoji)
console.log(emoji[0]);     // '�' (incomplete character)

// Comparison with alternatives

// Getting last element
const items = [10, 20, 30, 40];

// Method 1: length - 1
console.log(items[items.length - 1]);  // 40

// Method 2: slice
console.log(items.slice(-1)[0]);       // 40

// Method 3: at() ✅ (best)
console.log(items.at(-1));             // 40

// Getting second to last
console.log(items[items.length - 2]);  // 30
console.log(items.at(-2));             // 30 (cleaner!)

// TypedArray support
const uint8 = new Uint8Array([10, 20, 30, 40]);
console.log(uint8.at(-1));  // 40

// Works with any indexable object
function testAt(indexable) {
  console.log('Last:', indexable.at?.(-1) ?? 'not supported');
}

testAt([1, 2, 3]);           // Last: 3
testAt('hello');             // Last: o
testAt(new Set([1, 2, 3]));  // Last: not supported (Set not indexable)

// Polyfill concept
if (!Array.prototype.at) {
  Array.prototype.at = function(index) {
    const len = this.length;
    const relativeIndex = index >= 0 ? index : len + index;
    if (relativeIndex < 0 || relativeIndex >= len) {
      return undefined;
    }
    return this[relativeIndex];
  };
}

export { getLastItem, isPalindrome, getNthFromEnd, safeAccess };
