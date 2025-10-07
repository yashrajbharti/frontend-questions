/**
 * Logical Assignment Operators (ES2021)
 * 
 * Combines logical operators with assignment:
 * - &&= (AND assignment)
 * - ||= (OR assignment)  
 * - ??= (Nullish coalescing assignment)
 */

// 1. OR assignment (||=)
// Assigns only if left side is falsy
let a = 0;
let b = 5;

a ||= 10;  // a is falsy, so a = 10
b ||= 20;  // b is truthy, so b stays 5

console.log(a); // 10
console.log(b); // 5

// Equivalent to:
// a = a || 10;

// Practical use: Default values
const config = { port: null, host: 'localhost' };
config.port ||= 3000;    // 3000
config.host ||= 'default'; // 'localhost' (not changed)

// 2. AND assignment (&&=)
// Assigns only if left side is truthy
let x = 5;
let y = 0;

x &&= 10;  // x is truthy, so x = 10
y &&= 20;  // y is falsy, so y stays 0

console.log(x); // 10
console.log(y); // 0

// Equivalent to:
// x = x && 10;

// Practical use: Conditional updates
const user = { name: 'John', age: 30 };
user.name &&= user.name.toUpperCase(); // 'JOHN'
user.email &&= user.email.toLowerCase(); // undefined (email doesn't exist)

// 3. Nullish coalescing assignment (??=)
// Assigns only if left side is null or undefined
let m = null;
let n = 0;
let p = undefined;

m ??= 5;  // m is null, so m = 5
n ??= 10; // n is 0 (not null/undefined), so n stays 0
p ??= 15; // p is undefined, so p = 15

console.log(m); // 5
console.log(n); // 0
console.log(p); // 15

// Equivalent to:
// m = m ?? 5;

// Practical examples

// 1. Lazy initialization
class Cache {
  constructor() {
    this.data = null;
  }
  
  getData() {
    // Initialize only if null/undefined
    this.data ??= this.fetchData();
    return this.data;
  }
  
  fetchData() {
    return { loaded: true };
  }
}

// 2. Form validation
function validateForm(formData) {
  formData.username ||= 'guest';
  formData.age ??= 18; // Allows 0 as valid age
  formData.email &&= formData.email.trim();
  
  return formData;
}

// 3. Options merging
function createWidget(options = {}) {
  options.width ??= 300;
  options.height ??= 200;
  options.visible ||= true;
  options.title &&= options.title.trim();
  
  return options;
}

// 4. Nested object initialization
const settings = {};
settings.theme ??= {};
settings.theme.mode ??= 'light';
settings.theme.colors ??= {};
settings.theme.colors.primary ??= '#007bff';

// 5. Array operations
const arrays = {
  numbers: [1, 2, 3],
  strings: null,
  objects: undefined
};

arrays.numbers &&= arrays.numbers.filter(n => n > 1);
arrays.strings ??= [];
arrays.objects ??= [];

console.log(arrays);
// { numbers: [2, 3], strings: [], objects: [] }

// 6. Performance optimization (short-circuit evaluation)
let expensiveResult;

// Only compute if not already set
expensiveResult ??= computeExpensiveOperation();

function computeExpensiveOperation() {
  console.log('Computing...');
  return 42;
}

// Comparison table
const examples = {
  value: null,
  zero: 0,
  empty: '',
  present: 'data'
};

// Using ||=
examples.value ||= 'default';   // 'default'
examples.zero ||= 10;           // 10 (0 is falsy)
examples.empty ||= 'text';      // 'text' ('' is falsy)
examples.present ||= 'other';   // 'data' (unchanged)

// Using ??=
examples.value ??= 'default';   // 'default'
examples.zero ??= 10;           // 0 (not null/undefined)
examples.empty ??= 'text';      // '' (not null/undefined)
examples.present ??= 'other';   // 'data' (unchanged)

export { validateForm, createWidget };
