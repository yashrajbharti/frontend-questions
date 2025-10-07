/**
 * Numeric Separators (ES2021)
 *
 * Use underscores (_) to make large numbers more readable.
 * The separators are ignored by JavaScript - they're purely visual.
 */

// Basic usage - makes numbers readable
const billion = 1_000_000_000;
const million = 1_000_000;
const thousand = 1_000;

console.log(billion); // 1000000000
console.log(million); // 1000000
console.log(thousand); // 1000

// Financial calculations
const budget = 1_500_000_000; // 1.5 billion
const expense = 450_000; // 450 thousand
const profit = budget - expense;

// Credit card numbers
const cardNumber = 1234_5678_9012_3456;

// Binary literals
const permissions = 0b1010_0001_1000_0101;
const bitmask = 0b1111_0000;

console.log(permissions.toString(2)); // "1010000110000101"

// Hexadecimal
const color = 0xff_ec_de; // RGB color
const address = 0xdead_beef;

console.log(color.toString(16)); // "ffecde"
console.log(address.toString(16)); // "deadbeef"

// Octal
const octalValue = 0o123_456_777;

// BigInt with separators
const hugeBigInt = 9_007_199_254_740_991n;
const largeId = 1_234_567_890_123_456_789n;

// Decimal numbers
const pi = 3.141_592_653_589_793;
const scientificNotation = 1_000e10_000; // Not allowed between e and exponent
const money = 123_456.789_012;

console.log(pi); // 3.141592653589793
console.log(money); // 123456.789012

// Practical examples

// 1. Large constants
const MILLISECONDS_IN_DAY = 86_400_000;
const BYTES_IN_GIGABYTE = 1_073_741_824;
const US_POPULATION = 331_900_000;

// 2. Scientific values
const SPEED_OF_LIGHT = 299_792_458; // meters per second
const AVOGADRO_NUMBER = 6.022_140_76e23;
const PLANCK_CONSTANT = 6.626_070_15e-34;

// 3. Financial data
const marketCap = 2_500_000_000_000; // $2.5 trillion
const stockPrice = 1_234.56;
const tradingVolume = 15_000_000;

// 4. IP addresses (as integers)
const ipAddress = 192_168_1_1; // Not a valid representation, but readable

// 5. Phone numbers
const phoneNumber = 1_800_555_1234;

// Rules and limitations

// ✅ Allowed
const good1 = 1_000;
const good2 = 1_000_000;
const good3 = 0b1010_0001;
const good4 = 0xff_ff;
const good5 = 123.456_789;
const good6 = 1_000n;

// ❌ Not allowed
// const bad1 = _1000;       // Can't start with _
// const bad2 = 1000_;       // Can't end with _
// const bad3 = 1__000;      // Can't use consecutive _
// const bad4 = 0_b1010;     // Can't separate prefix
// const bad5 = 1e_5;        // Can't separate exponent
// const bad6 = .123_456;    // Can't start decimal with _

// Parsing strings with separators
// parseInt doesn't support separators in string
console.log(parseInt("1_000")); // 1 (stops at _)
console.log(parseInt("1000")); // 1000

// Need to remove separators first
const strWithSep = "1_000_000";
const parsed = parseInt(strWithSep.replace(/_/g, "")); // 1000000

// Practical utilities
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "_");
}

console.log(formatNumber(1234567)); // "1_234_567"

function parseFormattedNumber(str) {
  return Number(str.replace(/_/g, ""));
}

console.log(parseFormattedNumber("1_234_567")); // 1234567

// Use cases in real applications
const CONFIG = {
  MAX_FILE_SIZE: 10_485_760, // 10 MB
  CACHE_DURATION: 3_600_000, // 1 hour in ms
  MAX_USERS: 100_000,
  API_RATE_LIMIT: 1_000, // requests per hour
  TIMEOUT: 30_000, // 30 seconds
};

export { formatNumber, parseFormattedNumber, CONFIG };
