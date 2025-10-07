/**
 * JavaScript Date Methods and Temporal API Preview
 * 
 * Working with dates - built-in Date object methods and patterns.
 */

// Creating dates
const now = new Date();
const specific = new Date('2024-03-15T10:30:00');
const fromTimestamp = new Date(1710499800000);
const fromComponents = new Date(2024, 2, 15, 10, 30, 0); // Month is 0-indexed!

console.log(now);
console.log(specific);

// Getting date components
const date = new Date('2024-03-15T10:30:45.123');

console.log(date.getFullYear());     // 2024
console.log(date.getMonth());        // 2 (March, 0-indexed)
console.log(date.getDate());         // 15 (day of month)
console.log(date.getDay());          // 5 (Friday, 0=Sunday)
console.log(date.getHours());        // 10
console.log(date.getMinutes());      // 30
console.log(date.getSeconds());      // 45
console.log(date.getMilliseconds()); // 123
console.log(date.getTime());         // Timestamp in milliseconds

// UTC methods
console.log(date.getUTCHours());
console.log(date.getUTCDate());

// Setting date components
const mutableDate = new Date('2024-01-01');
mutableDate.setFullYear(2025);
mutableDate.setMonth(11); // December
mutableDate.setDate(25);
mutableDate.setHours(23, 59, 59, 999);

console.log(mutableDate); // 2025-12-25T23:59:59.999

// Date arithmetic
const today = new Date('2024-03-15');

// Add days
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

// Add months
const nextMonth = new Date(today);
nextMonth.setMonth(nextMonth.getMonth() + 1);

// Subtract days
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

// Date comparison
const date1 = new Date('2024-03-15');
const date2 = new Date('2024-03-20');

console.log(date1 < date2);           // true
console.log(date1.getTime() === date2.getTime()); // false

// Practical utilities

// 1. Format date as YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

console.log(formatDate(new Date())); // "2024-03-15"

// 2. Get days between dates
function daysBetween(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date1 - date2) / oneDay));
}

console.log(daysBetween(
  new Date('2024-03-01'),
  new Date('2024-03-15')
)); // 14

// 3. Add days to date (immutable)
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// 4. Start of day
function startOfDay(date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

// 5. End of day
function endOfDay(date) {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

// 6. Is same day
function isSameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
}

// 7. Get week number
function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

// 8. Is weekend
function isWeekend(date) {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
}

// 9. Get month name
function getMonthName(date, locale = 'en-US') {
  return date.toLocaleDateString(locale, { month: 'long' });
}

// 10. Get day name
function getDayName(date, locale = 'en-US') {
  return date.toLocaleDateString(locale, { weekday: 'long' });
}

// 11. Age calculator
function calculateAge(birthDate) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

// 12. Get quarter
function getQuarter(date) {
  return Math.floor(date.getMonth() / 3) + 1;
}

// 13. Days in month
function daysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

// 14. Is leap year
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// 15. Get ISO week date
function toISOString(date) {
  return date.toISOString(); // "2024-03-15T10:30:00.000Z"
}

// Date formatting options
const dateOptions = {
  short: { month: 'short', day: 'numeric', year: 'numeric' },
  long: { month: 'long', day: 'numeric', year: 'numeric' },
  full: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
};

function formatDateCustom(date, style = 'short') {
  return date.toLocaleDateString('en-US', dateOptions[style]);
}

// Relative time
function getRelativeTime(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return formatDate(date);
}

// Working with timezones
function getTimezoneOffset() {
  return new Date().getTimezoneOffset(); // Minutes from UTC
}

// Date range generator
function* dateRange(start, end, step = 1) {
  const current = new Date(start);
  while (current <= end) {
    yield new Date(current);
    current.setDate(current.getDate() + step);
  }
}

// Usage
const start = new Date('2024-03-01');
const end = new Date('2024-03-07');
for (const date of dateRange(start, end)) {
  console.log(formatDate(date));
}

// Common patterns
const patterns = {
  // First day of month
  firstDayOfMonth: (date) => new Date(date.getFullYear(), date.getMonth(), 1),
  
  // Last day of month
  lastDayOfMonth: (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0),
  
  // Add months
  addMonths: (date, months) => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  },
  
  // Is today
  isToday: (date) => isSameDay(date, new Date()),
  
  // Is past
  isPast: (date) => date < new Date(),
  
  // Is future
  isFuture: (date) => date > new Date()
};

export {
  formatDate,
  daysBetween,
  addDays,
  startOfDay,
  endOfDay,
  isSameDay,
  getWeekNumber,
  isWeekend,
  calculateAge,
  getQuarter,
  daysInMonth,
  isLeapYear,
  getRelativeTime,
  dateRange,
  patterns
};
