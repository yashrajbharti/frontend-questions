/**
 * Double Bang (!!) Operator
 * 
 * The double negation operator converts any value to its boolean equivalent.
 * It's a shorthand for Boolean(value).
 */

// Basic usage
console.log(!!true);        // true
console.log(!!false);       // false
console.log(!!"hello");     // true
console.log(!!"");          // false
console.log(!!1);           // true
console.log(!!0);           // false
console.log(!!null);        // false
console.log(!!undefined);   // false
console.log(!!NaN);         // false
console.log(!!{});          // true
console.log(!![]);          // true

// Practical use cases

// 1. Convert to boolean explicitly
function hasValue(value) {
  return !!value;
}

// 2. Filter truthy values
const arr = [0, 1, "", "hello", null, undefined, false, true];
const truthyOnly = arr.filter(item => !!item);
console.log(truthyOnly); // [1, "hello", true]

// 3. Check if object has properties
const obj = { name: "John" };
const isEmpty = !!Object.keys(obj).length;
console.log(isEmpty); // true

// 4. Feature detection
const hasLocalStorage = !!window.localStorage;
const hasGeolocation = !!navigator.geolocation;

// 5. Converting API responses
function isUserActive(user) {
  // Convert status to boolean
  return !!user?.isActive;
}

// Comparison with Boolean()
console.log(!!"test" === Boolean("test")); // true
console.log(!!0 === Boolean(0));           // true

export default hasValue;
