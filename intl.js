/**
 * Intl API - Internationalization
 * 
 * Built-in API for formatting dates, numbers, currencies, and more
 * based on locale and language preferences.
 */

// 1. Intl.DateTimeFormat - Format dates
const date = new Date('2024-03-15T10:30:00');

// Different locales
const usDate = new Intl.DateTimeFormat('en-US').format(date);
const ukDate = new Intl.DateTimeFormat('en-GB').format(date);
const frDate = new Intl.DateTimeFormat('fr-FR').format(date);

console.log(usDate); // "3/15/2024"
console.log(ukDate); // "15/03/2024"
console.log(frDate); // "15/03/2024"

// With options
const longDate = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}).format(date);

console.log(longDate); // "Friday, March 15, 2024"

// Time formatting
const time = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true
}).format(date);

console.log(time); // "10:30:00 AM"

// 2. Intl.NumberFormat - Format numbers
const number = 1234567.89;

// Different locales
const usNumber = new Intl.NumberFormat('en-US').format(number);
const deNumber = new Intl.NumberFormat('de-DE').format(number);
const inNumber = new Intl.NumberFormat('en-IN').format(number);

console.log(usNumber); // "1,234,567.89"
console.log(deNumber); // "1.234.567,89"
console.log(inNumber); // "12,34,567.89"

// Currency formatting
const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).format(1234.56);

const eur = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR'
}).format(1234.56);

const jpy = new Intl.NumberFormat('ja-JP', {
  style: 'currency',
  currency: 'JPY'
}).format(1234.56);

console.log(usd); // "$1,234.56"
console.log(eur); // "1.234,56 €"
console.log(jpy); // "¥1,235"

// Percentage
const percent = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2
}).format(0.856);

console.log(percent); // "85.60%"

// Units
const distance = new Intl.NumberFormat('en-US', {
  style: 'unit',
  unit: 'kilometer',
  unitDisplay: 'long'
}).format(50);

console.log(distance); // "50 kilometers"

// 3. Intl.RelativeTimeFormat - Relative time
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

console.log(rtf.format(-1, 'day'));   // "yesterday"
console.log(rtf.format(0, 'day'));    // "today"
console.log(rtf.format(1, 'day'));    // "tomorrow"
console.log(rtf.format(-3, 'week'));  // "3 weeks ago"
console.log(rtf.format(2, 'month')); // "in 2 months"

// 4. Intl.ListFormat - Format lists
const list = ['Apple', 'Banana', 'Orange'];

const enList = new Intl.ListFormat('en').format(list);
const esList = new Intl.ListFormat('es').format(list);

console.log(enList); // "Apple, Banana, and Orange"
console.log(esList); // "Apple, Banana y Orange"

// Different styles
const orList = new Intl.ListFormat('en', { type: 'disjunction' }).format(list);
console.log(orList); // "Apple, Banana, or Orange"

// 5. Intl.PluralRules - Pluralization
const pr = new Intl.PluralRules('en-US');

function pluralize(count, singular, plural) {
  const rule = pr.select(count);
  return rule === 'one' ? singular : plural;
}

console.log(`${1} ${pluralize(1, 'item', 'items')}`);  // "1 item"
console.log(`${5} ${pluralize(5, 'item', 'items')}`);  // "5 items"

// 6. Intl.Collator - String comparison and sorting
const collator = new Intl.Collator('en', { sensitivity: 'base' });

const names = ['Émile', 'Emily', 'Émilie', 'Emile'];
const sorted = names.sort((a, b) => collator.compare(a, b));
console.log(sorted);

// Practical examples

// 1. Format price with currency
function formatPrice(price, locale = 'en-US', currency = 'USD') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(price);
}

console.log(formatPrice(99.99));           // "$99.99"
console.log(formatPrice(99.99, 'fr-FR', 'EUR')); // "99,99 €"

// 2. Format date range
const start = new Date('2024-03-01');
const end = new Date('2024-03-15');

const dateRangeFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric'
});

console.log(dateRangeFormatter.formatRange(start, end));
// "March 1 – 15"

// 3. Time ago helper
function timeAgo(date) {
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  
  if (days > 0) return rtf.format(-days, 'day');
  if (hours > 0) return rtf.format(-hours, 'hour');
  if (minutes > 0) return rtf.format(-minutes, 'minute');
  return rtf.format(-seconds, 'second');
}

const pastDate = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
console.log(timeAgo(pastDate)); // "2 hours ago"

// 4. Compact number formatting
const compactFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short'
});

console.log(compactFormatter.format(1000));      // "1K"
console.log(compactFormatter.format(1500000));   // "1.5M"
console.log(compactFormatter.format(2400000000)); // "2.4B"

// 5. Display names API
const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
console.log(regionNames.of('US')); // "United States"
console.log(regionNames.of('FR')); // "France"

const langNames = new Intl.DisplayNames(['en'], { type: 'language' });
console.log(langNames.of('en')); // "English"
console.log(langNames.of('fr')); // "French"

// 6. Multi-locale support
class LocaleManager {
  constructor(defaultLocale = 'en-US') {
    this.locale = defaultLocale;
  }
  
  setLocale(locale) {
    this.locale = locale;
  }
  
  formatDate(date, options = {}) {
    return new Intl.DateTimeFormat(this.locale, options).format(date);
  }
  
  formatNumber(number, options = {}) {
    return new Intl.NumberFormat(this.locale, options).format(number);
  }
  
  formatCurrency(amount, currency) {
    return new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency
    }).format(amount);
  }
}

const locale = new LocaleManager('en-US');
console.log(locale.formatCurrency(1234.56, 'USD')); // "$1,234.56"

locale.setLocale('de-DE');
console.log(locale.formatCurrency(1234.56, 'EUR')); // "1.234,56 €"

export { formatPrice, timeAgo, LocaleManager };
