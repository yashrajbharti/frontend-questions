/**
 * BigInt - Arbitrary Precision Integers
 * 
 * BigInt allows representation of integers larger than 2^53 - 1
 * (the largest number JavaScript can reliably represent with Number)
 */

// Creating BigInt
const big1 = 1234567890123456789012345678901234567890n;
const big2 = BigInt("9876543210987654321098765432109876543210");
const big3 = BigInt(123);

console.log(typeof big1); // "bigint"

// Number limitation
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(9007199254740992 === 9007199254740993); // true (precision lost!)

// BigInt maintains precision
console.log(9007199254740992n === 9007199254740993n); // false (correct!)

// Arithmetic operations
const a = 100n;
const b = 50n;

console.log(a + b);  // 150n
console.log(a - b);  // 50n
console.log(a * b);  // 5000n
console.log(a / b);  // 2n (integer division, no decimals)
console.log(a % b);  // 0n
console.log(a ** b); // 100^50 (huge number)

// Cannot mix BigInt with Number
// console.log(10n + 5);  // TypeError
console.log(10n + 5n); // 15n (correct)

// Conversions
const num = 42;
const big = BigInt(num);     // 42n
const backToNum = Number(big); // 42

// Be careful with large BigInts
const hugeBig = 9007199254740992n;
const converted = Number(hugeBig); // May lose precision

// Comparison operators work
console.log(5n < 10n);    // true
console.log(5n == 5);     // true (type coercion)
console.log(5n === 5);    // false (different types)
console.log(10n > 5);     // true

// Practical use cases

// 1. Cryptography - large prime numbers
function isPrime(n) {
  if (n <= 1n) return false;
  if (n <= 3n) return true;
  if (n % 2n === 0n || n % 3n === 0n) return false;
  
  for (let i = 5n; i * i <= n; i += 6n) {
    if (n % i === 0n || n % (i + 2n) === 0n) return false;
  }
  return true;
}

// 2. Financial calculations (avoiding floating point errors)
function calculateInterest(principal, rate, years) {
  // Convert to cents to avoid decimals
  const principalCents = BigInt(Math.round(principal * 100));
  const ratePercent = BigInt(Math.round(rate * 100));
  const yearsInt = BigInt(years);
  
  const interest = (principalCents * ratePercent * yearsInt) / 10000n;
  return Number(interest) / 100; // Convert back to dollars
}

// 3. Timestamps in microseconds
const nowMicro = BigInt(Date.now()) * 1000n;
console.log(nowMicro); // Timestamp in microseconds

// 4. Large ID generation
function generateLargeId() {
  return BigInt(Date.now()) * 1000000n + BigInt(Math.floor(Math.random() * 1000000));
}

// 5. Factorial of large numbers
function factorial(n) {
  if (n <= 1n) return 1n;
  return n * factorial(n - 1n);
}

console.log(factorial(20n)); // 2432902008176640000n

// BitWise operations
const x = 12n;
const y = 5n;

console.log(x & y);   // 4n (AND)
console.log(x | y);   // 13n (OR)
console.log(x ^ y);   // 9n (XOR)
console.log(~x);      // -13n (NOT)
console.log(x << 2n); // 48n (Left shift)
console.log(x >> 1n); // 6n (Right shift)

// JSON doesn't support BigInt
const obj = { big: 100n };
// JSON.stringify(obj); // TypeError

// Custom serialization
JSON.stringify(obj, (key, value) => 
  typeof value === 'bigint' ? value.toString() : value
);
// {"big":"100"}

// Math methods don't work with BigInt
// console.log(Math.sqrt(16n)); // TypeError

// Custom implementations needed
function bigIntSqrt(value) {
  if (value < 0n) throw new Error('Square root of negative numbers is not supported');
  if (value < 2n) return value;

  let x = value;
  let y = (x + 1n) / 2n;
  
  while (y < x) {
    x = y;
    y = (x + value / x) / 2n;
  }
  
  return x;
}

console.log(bigIntSqrt(144n)); // 12n

// Check if BigInt is supported
const supportsBigInt = typeof BigInt !== 'undefined';

export { isPrime, calculateInterest, generateLargeId, factorial, bigIntSqrt };
