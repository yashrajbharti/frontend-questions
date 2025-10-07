/**
 * JSON Methods and Advanced Usage
 * 
 * JSON.parse() and JSON.stringify() with advanced features:
 * - Reviver and replacer functions
 * - Formatting and indentation
 * - Handling special types
 */

// Basic usage
const obj = { name: 'John', age: 30, city: 'NYC' };
const jsonString = JSON.stringify(obj);
console.log(jsonString); // '{"name":"John","age":30,"city":"NYC"}'

const parsed = JSON.parse(jsonString);
console.log(parsed); // { name: 'John', age: 30, city: 'NYC' }

// JSON.stringify with spacing (pretty print)
const formatted = JSON.stringify(obj, null, 2);
console.log(formatted);
/*
{
  "name": "John",
  "age": 30,
  "city": "NYC"
}
*/

// Using tabs for indentation
const tabbed = JSON.stringify(obj, null, '\t');

// Replacer function (2nd parameter)
const user = {
  name: 'Alice',
  password: 'secret123',
  email: 'alice@example.com',
  age: 25
};

// Filter out sensitive fields
const safe = JSON.stringify(user, (key, value) => {
  if (key === 'password') return undefined;
  return value;
});
console.log(safe); // No password field

// Replacer with array (whitelist properties)
const limited = JSON.stringify(user, ['name', 'email']);
console.log(limited); // Only name and email

// Reviver function (2nd parameter of parse)
const dateString = '{"name":"Event","date":"2024-03-15T10:30:00.000Z"}';

const withDate = JSON.parse(dateString, (key, value) => {
  if (key === 'date') return new Date(value);
  return value;
});

console.log(withDate.date instanceof Date); // true

// toJSON method - custom serialization
class Person {
  constructor(name, age, ssn) {
    this.name = name;
    this.age = age;
    this.ssn = ssn; // Sensitive
  }
  
  toJSON() {
    return {
      name: this.name,
      age: this.age
      // Exclude SSN
    };
  }
}

const person = new Person('Bob', 30, '123-45-6789');
console.log(JSON.stringify(person)); // No SSN

// Handling special values
const special = {
  undef: undefined,
  nul: null,
  nan: NaN,
  inf: Infinity,
  negInf: -Infinity,
  date: new Date(),
  regex: /test/gi,
  func: () => {},
  symbol: Symbol('test')
};

console.log(JSON.stringify(special));
// undefined, functions, and symbols are omitted
// NaN and Infinity become null
// Date becomes ISO string
// RegExp becomes {}

// Deep cloning with JSON (limitations apply)
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const original = { a: 1, b: { c: 2 } };
const cloned = deepClone(original);
cloned.b.c = 3;
console.log(original.b.c); // 2 (not affected)

// Practical examples

// 1. Save/load from localStorage
function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Failed to save:', e);
    return false;
  }
}

function loadFromStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error('Failed to load:', e);
    return null;
  }
}

// 2. API request/response handling
async function fetchJSON(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

// 3. Custom date serialization
const dateReplacer = (key, value) => {
  if (value instanceof Date) {
    return { __type: 'Date', value: value.toISOString() };
  }
  return value;
};

const dateReviver = (key, value) => {
  if (value && value.__type === 'Date') {
    return new Date(value.value);
  }
  return value;
};

const data = { event: 'Meeting', date: new Date() };
const serialized = JSON.stringify(data, dateReplacer);
const deserialized = JSON.parse(serialized, dateReviver);
console.log(deserialized.date instanceof Date); // true

// 4. Remove circular references
function stringifyWithoutCircular(obj) {
  const seen = new WeakSet();
  
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '[Circular]';
      }
      seen.add(value);
    }
    return value;
  });
}

const circular = { name: 'Node' };
circular.self = circular;
console.log(stringifyWithoutCircular(circular));

// 5. Compress keys for storage
function compress(obj) {
  const keyMap = { name: 'n', email: 'e', age: 'a' };
  return JSON.stringify(obj, (key, value) => {
    return value;
  }).replace(/"(name|email|age)":/g, (match, p1) => `"${keyMap[p1]}":`);
}

// 6. Pretty error messages
function prettyStringify(obj, indent = 2) {
  try {
    return JSON.stringify(obj, null, indent);
  } catch (error) {
    if (error.message.includes('circular')) {
      return stringifyWithoutCircular(obj);
    }
    throw error;
  }
}

// 7. Merge JSON objects
function mergeJSON(target, source) {
  const merged = JSON.parse(JSON.stringify(target));
  Object.assign(merged, JSON.parse(JSON.stringify(source)));
  return merged;
}

// 8. Validate JSON string
function isValidJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

// 9. Transform keys
function transformKeys(obj, transformer) {
  return JSON.parse(JSON.stringify(obj, (key, value) => {
    if (key && typeof value === 'object' && !Array.isArray(value)) {
      const transformed = {};
      for (const k in value) {
        transformed[transformer(k)] = value[k];
      }
      return transformed;
    }
    return value;
  }));
}

// Convert to camelCase
function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

// 10. Size calculation
function getJSONSize(obj) {
  return new Blob([JSON.stringify(obj)]).size;
}

// Advanced patterns

// Preserve undefined in arrays
const customStringify = (obj) => {
  return JSON.stringify(obj, (key, value) => {
    if (Array.isArray(value)) {
      return value.map(v => v === undefined ? null : v);
    }
    return value;
  });
};

// Handle BigInt
const bigIntReplacer = (key, value) => {
  if (typeof value === 'bigint') {
    return value.toString() + 'n';
  }
  return value;
};

const bigIntReviver = (key, value) => {
  if (typeof value === 'string' && /^\d+n$/.test(value)) {
    return BigInt(value.slice(0, -1));
  }
  return value;
};

// Handle Map and Set
const mapSetReplacer = (key, value) => {
  if (value instanceof Map) {
    return { __type: 'Map', value: Array.from(value.entries()) };
  }
  if (value instanceof Set) {
    return { __type: 'Set', value: Array.from(value) };
  }
  return value;
};

const mapSetReviver = (key, value) => {
  if (value && value.__type === 'Map') {
    return new Map(value.value);
  }
  if (value && value.__type === 'Set') {
    return new Set(value.value);
  }
  return value;
};

export {
  saveToStorage,
  loadFromStorage,
  fetchJSON,
  stringifyWithoutCircular,
  prettyStringify,
  isValidJSON,
  transformKeys,
  getJSONSize,
  dateReplacer,
  dateReviver,
  bigIntReplacer,
  bigIntReviver,
  mapSetReplacer,
  mapSetReviver
};
